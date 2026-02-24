
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Input state with proper cleanup
const inputKeys: { [key: string]: boolean } = { 
    ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false, 
    KeyW: false, KeyA: false, KeyS: false, KeyD: false, 
    ShiftLeft: false, ShiftRight: false 
};

// Event handlers with cleanup support
let keydownHandler: ((e: KeyboardEvent) => void) | null = null;
let keyupHandler: ((e: KeyboardEvent) => void) | null = null;

function setupInputListeners() {
    if (typeof window === 'undefined') return;
    
    // Clean up old listeners
    if (keydownHandler) window.removeEventListener('keydown', keydownHandler);
    if (keyupHandler) window.removeEventListener('keyup', keyupHandler);
    
    keydownHandler = (e) => { 
        if (e.code in inputKeys) inputKeys[e.code] = true; 
    };
    keyupHandler = (e) => { 
        if (e.code in inputKeys) inputKeys[e.code] = false; 
    };
    
    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);
}

setupInputListeners();

const EYE_LEVEL = 1.72;
const WALK_SPEED = 4.5;
const SPRINT_SPEED = 8.0;
const TURN_SPEED = 1.9;
const MOUSE_SENS = 0.0017;

// Pre-allocated quaternions/vectors to avoid GC pressure
const Q_UP = new THREE.Quaternion();
const Q_RIGHT = new THREE.Quaternion();
const Q_ROLL = new THREE.Quaternion();          // pre-alloc, never new in frame loop
const AXIS_Y = new THREE.Vector3(0, 1, 0);
const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Z = new THREE.Vector3(0, 0, 1);      // for roll
const _front = new THREE.Vector3();
const _side = new THREE.Vector3();
const _target = new THREE.Vector3();
const _localRight = new THREE.Vector3(1, 0, 0);  // pre-alloc lateral sway

export const Player = ({ started, paused, onPositionChange, onSprintChange, mobileHandlers }: any) => {
    const { camera } = useThree();

    // ── State refs (avoid React re-renders) ────────────────
    const yaw = useRef(0);
    const pitch = useRef(0);
    const velocity = useRef(new THREE.Vector3(0, 0, 0));  // Reset velocity to zero
    const fovTarget = useRef(65);
    const gameActive = useRef(false);  // Block input until user interacts

    // ── Head bob refs ───────────────────────────────────────
    const bobPhase = useRef(0);          // advances with speed
    const bobY = useRef(EYE_LEVEL);  // current Y after bob
    const bobX = useRef(0);          // lateral sway
    const roll = useRef(0);          // camera roll (lean on turn)

    // ── Mobile inputs ───────────────────────────────────────
    const mobileMove = useRef({ x: 0, y: 0 });
    const mobileLook = useRef({ dx: 0, dy: 0 });
    const mobileSprint = useRef(false);

    // Connect mobile handlers to parent
    useEffect(() => {
        if (mobileHandlers?.current) {
            mobileHandlers.current.onMove = (x: number, y: number) => { mobileMove.current = { x, y }; };
            mobileHandlers.current.onLook = (dx: number, dy: number) => { mobileLook.current.dx += dx; mobileLook.current.dy += dy; };
            mobileHandlers.current.onSprint = (s: boolean) => { mobileSprint.current = s; };
        }
    }, [mobileHandlers]);

    // Reset camera and input state on mount
    useEffect(() => {
        camera.quaternion.identity();
        camera.position.set(0, EYE_LEVEL, 12);  // Spawn in front of center table (moved back a bit)
        camera.up.set(0, 1, 0);
        yaw.current = 0;
        pitch.current = 0;
        velocity.current.set(0, 0, 0);
        gameActive.current = false;  // Wait for user interaction
    }, [camera]);

    // Mouse & scroll listeners
    useEffect(() => {
        if (!started) return;

        const onMove = (e: MouseEvent) => {
            if (paused) return;  // paused = true before exitPointerLock fires, so no spin
            if (!document.pointerLockElement) return;
            yaw.current -= e.movementX * MOUSE_SENS;
            pitch.current -= e.movementY * MOUSE_SENS;
            pitch.current = Math.max(-0.42, Math.min(0.42, pitch.current));
        };

        const onWheel = (e: WheelEvent) => {
            if (paused) return;
            fovTarget.current = Math.max(32, Math.min(85, fovTarget.current + e.deltaY * 0.04));
        };

        const onClick = () => {
            if ((window as any).__paintingClicked) { (window as any).__paintingClicked = false; return; }
            if (!paused) {
                const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
                if (!isMobile) {
                    document.body.requestPointerLock();
                    gameActive.current = true;  // Enable controls after first click
                }
            }
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('click', onClick);
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('click', onClick);
            window.removeEventListener('wheel', onWheel);
        };
    }, [started, paused]);

    useFrame((_s, delta) => {
        if (!started) return;
        // Clamp delta to prevent huge jumps on frame drops
        const dt = Math.min(delta, 0.033); // Cap at ~30 FPS equivalent

        // ── FOV zoom ──────────────────────────────────────
        const cam = camera as THREE.PerspectiveCamera;
        if (Math.abs(cam.fov - fovTarget.current) > 0.1) {
            cam.fov = THREE.MathUtils.lerp(cam.fov, fovTarget.current, 0.08);
            cam.updateProjectionMatrix();
        }

        if (paused || !gameActive.current) return;  // Block input until user clicks

        // ── Mobile look ───────────────────────────────────
        if (mobileLook.current.dx || mobileLook.current.dy) {
            yaw.current -= mobileLook.current.dx * 1.4;
            pitch.current -= mobileLook.current.dy * 1.4;
            pitch.current = Math.max(-0.42, Math.min(0.42, pitch.current));
            mobileLook.current.dx = 0;
            mobileLook.current.dy = 0;
        }

        // ── Arrow key turn ────────────────────────────────
        if (inputKeys.ArrowLeft) yaw.current += TURN_SPEED * dt;
        if (inputKeys.ArrowRight) yaw.current -= TURN_SPEED * dt;

        // ── Camera orientation ────────────────────────────
        Q_UP.setFromAxisAngle(AXIS_Y, yaw.current);
        Q_RIGHT.setFromAxisAngle(AXIS_X, pitch.current);

        // Apply roll (lean on strafe) — subtle, human feel
        const rollAngle = THREE.MathUtils.clamp(
            THREE.MathUtils.lerp(roll.current, -velocity.current.x * 0.005, 0.12),
            -0.028, 0.028
        );
        roll.current = rollAngle;
        Q_ROLL.setFromAxisAngle(AXIS_Z, rollAngle);   // reuse pre-alloc, no 'new'
        camera.quaternion.multiplyQuaternions(Q_UP, Q_RIGHT).multiply(Q_ROLL);

        // ── Movement direction ────────────────────────────
        _front.set(-Math.sin(yaw.current), 0, -Math.cos(yaw.current));
        _side.crossVectors(_front, AXIS_Y).normalize();

        const forward = inputKeys.ArrowUp || inputKeys.KeyW;
        const backward = inputKeys.ArrowDown || inputKeys.KeyS;
        const left = inputKeys.KeyA;
        const right = inputKeys.KeyD;
        const sprint = inputKeys.ShiftLeft || inputKeys.ShiftRight;

        const mX = mobileMove.current.x;
        const mY = mobileMove.current.y;
        const mobileMoving = Math.abs(mX) > 0.05 || Math.abs(mY) > 0.05;
        const activeSprint = sprint || mobileSprint.current;
        const speed = activeSprint ? SPRINT_SPEED : WALK_SPEED;

        _target.set(0, 0, 0);
        // Fixed: W/ArrowUp = forward (negative Z in Three.js)
        if (forward) _target.addScaledVector(_front, speed);
        if (backward) _target.addScaledVector(_front, -speed * 0.65);
        if (left) _target.addScaledVector(_side, -speed * 0.8);
        if (right) _target.addScaledVector(_side, speed * 0.8);
        if (mobileMoving) {
            _target.addScaledVector(_front, mY * speed);
            _target.addScaledVector(_side, mX * speed * 0.8);
        }
        if (_target.length() > speed) _target.normalize().multiplyScalar(speed);

        // ── Smooth acceleration (human inertia) ───────────
        const moving = _target.length() > 0.1;
        const lerpAcc = moving ? 0.10 : 0.22;   // slower accel, faster stop
        velocity.current.lerp(_target, lerpAcc);

        // ── Position update with bounds ───────────────────
        camera.position.x += velocity.current.x * dt;
        camera.position.z += velocity.current.z * dt;
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -57, 57);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -57, 57);

        // ── Human head bob ────────────────────────────────
        const spd = velocity.current.length();
        if (spd > 0.2) {
            // Advance bob phase proportional to walk speed
            const bobRate = activeSprint ? 10.5 : 6.8;
            bobPhase.current += dt * bobRate * (spd / speed);

            // Vertical: sinusoidal step (up-down twice per cycle)
            const stepAmp = activeSprint ? 0.038 : 0.022;
            const stepH = Math.abs(Math.sin(bobPhase.current)) * stepAmp;

            // Lateral: subtle sway (once per two steps)
            const swayAmp = activeSprint ? 0.012 : 0.007;
            const swayH = Math.sin(bobPhase.current * 0.5) * swayAmp;

            bobY.current = THREE.MathUtils.lerp(bobY.current, EYE_LEVEL + stepH, 0.20);
            bobX.current = THREE.MathUtils.lerp(bobX.current, swayH, 0.18);
        } else {
            // Breathing idle sway
            const breathT = performance.now() * 0.0004;
            const breathY = Math.sin(breathT) * 0.0045;
            const breathX = Math.cos(breathT * 0.6) * 0.0018;
            bobY.current = THREE.MathUtils.lerp(bobY.current, EYE_LEVEL + breathY, 0.05);
            bobX.current = THREE.MathUtils.lerp(bobX.current, breathX, 0.05);
            // Reset phase so next step starts cleanly at 0
            bobPhase.current = THREE.MathUtils.lerp(bobPhase.current, 0, 0.06);
        }

        // Apply head position
        camera.position.y = bobY.current;
        // Lateral sway: shift camera slightly on its local X axis — reuse pre-alloc
        _localRight.set(1, 0, 0).applyQuaternion(Q_UP);
        camera.position.addScaledVector(_localRight, bobX.current);

        onPositionChange?.({ x: camera.position.x, z: camera.position.z });
        onSprintChange?.(activeSprint && moving);
    });

    return null;
};
