
import { useRef, useMemo, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── SHARED MATERIALS — created once, reused across all components ────────────
// This is the #1 performance win: avoids GPU material state switches & GC pressure
const MAT = {
    floor: new THREE.MeshStandardMaterial({ color: '#5a3518', roughness: 0.35, metalness: 0.12 }),
    ceiling: new THREE.MeshStandardMaterial({ color: '#dfd3b8', roughness: 1 }),
    wallBase: new THREE.MeshStandardMaterial({ color: '#e8ddc8', roughness: 0.95 }),
    wainscot: new THREE.MeshStandardMaterial({ color: '#2a1800', roughness: 0.7 }),
    goldMetal: new THREE.MeshStandardMaterial({ color: '#b8860b', metalness: 0.85, roughness: 0.15, emissive: new THREE.Color('#b8860b'), emissiveIntensity: 0.15 }),
    goldBright: new THREE.MeshStandardMaterial({ color: '#d4a017', metalness: 1, roughness: 0.08 }),
    darkWood: new THREE.MeshStandardMaterial({ color: '#2a1400', roughness: 0.75 }),
    medWood: new THREE.MeshStandardMaterial({ color: '#3a1e00', roughness: 0.82 }),
    lightWood: new THREE.MeshStandardMaterial({ color: '#8b4513', roughness: 0.65, metalness: 0.04 }),
    bamboo: new THREE.MeshStandardMaterial({ color: '#c8a040', roughness: 0.6 }),
    bambooDark: new THREE.MeshStandardMaterial({ color: '#a07828', roughness: 0.6 }),
    brownRope: new THREE.MeshStandardMaterial({ color: '#8b6914', roughness: 0.9 }),
    drumHead: new THREE.MeshStandardMaterial({ color: '#c8a878', roughness: 0.9 }),
    stonePillar: new THREE.MeshStandardMaterial({ color: '#ddd8cc', roughness: 0.5, metalness: 0.05 }),
    stoneCap: new THREE.MeshStandardMaterial({ color: '#c8c0b0', roughness: 0.8 }),
    redCarpet: new THREE.MeshStandardMaterial({ color: '#7a1a1a', roughness: 1 }),
    deepRed: new THREE.MeshStandardMaterial({ color: '#8b0000', roughness: 0.8 }),
    black: new THREE.MeshStandardMaterial({ color: '#1a0a00', roughness: 0.9 }),
};

// Shared geometries for performance (reuse instead of creating new)
const GEO = {
    box: new THREE.BoxGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(1, 8, 8),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 8),
};


// FLOOR — Polished dark wood (lightweight, HD look)
const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color="#5a3518" roughness={0.35} metalness={0.12} />
    </mesh>
);

// CEILING
const Ceiling = () => (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8.5, 0]}>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color="#dfd3b8" roughness={1} />
    </mesh>
);

// WALLS with wainscoting panels
const Wall = ({ position, rotation = [0, 0, 0] as [number, number, number], w = 122 }: any) => (
    <group position={position} rotation={rotation}>
        <mesh receiveShadow>
            <boxGeometry args={[w, 8.5, 0.3]} />
            <meshStandardMaterial color="#e8ddc8" roughness={0.95} />
        </mesh>
        {/* Lower wainscoting dark panel */}
        <mesh position={[0, -3.5, 0.16]}>
            <boxGeometry args={[w, 1.6, 0.06]} />
            <meshStandardMaterial color="#2a1800" roughness={0.7} />
        </mesh>
        {/* Gold top rail */}
        <mesh position={[0, -2.68, 0.17]}>
            <boxGeometry args={[w, 0.06, 0.05]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} emissive="#b8860b" emissiveIntensity={0.15} />
        </mesh>
        {/* Floor baseboard */}
        <mesh position={[0, -4.2, 0.17]}>
            <boxGeometry args={[w, 0.08, 0.04]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
        </mesh>
    </group>
);

// CEILING COFFER BEAMS — Pendopo style
const CeilingBeams = () => (
    <group position={[0, 8.2, 0]}>
        {[-44, -22, 0, 22, 44].map((x, i) => (
            <mesh key={`b-${i}`} position={[x, 0, 0]}>
                <boxGeometry args={[0.5, 0.55, 120]} />
                <meshStandardMaterial color="#2a1800" roughness={0.85} />
            </mesh>
        ))}
        {[-50, -25, 0, 25, 50].map((z, i) => (
            <mesh key={`c-${i}`} position={[0, 0.02, z]}>
                <boxGeometry args={[120, 0.4, 0.5]} />
                <meshStandardMaterial color="#3a2200" roughness={0.88} />
            </mesh>
        ))}
    </group>
);

// CEILING LIGHT PANELS (emissive strips)
const CeilingLightPanels = () => {
    const positions: [number, number, number][] = [
        [-33, 8.49, -37], [0, 8.49, -37], [33, 8.49, -37],
        [-33, 8.49, 0], [0, 8.49, 0], [33, 8.49, 0],
        [-33, 8.49, 37], [0, 8.49, 37], [33, 8.49, 37],
    ];
    return (
        <>
            {positions.map((p, i) => (
                <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 6]} />
                    <meshStandardMaterial
                        color="#fff6e0"
                        emissive="#ffdd88"
                        emissiveIntensity={1.2}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </>
    );
};

// PILLAR — polished stone column
const Pillar = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.38, 0.42, 8.5, 16]} />
            <meshStandardMaterial color="#ddd8cc" roughness={0.5} metalness={0.05} />
        </mesh>
        <mesh position={[0, -4.22, 0]}>
            <boxGeometry args={[1.0, 0.22, 1.0]} />
            <meshStandardMaterial color="#c8c0b0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4.22, 0]}>
            <boxGeometry args={[1.0, 0.22, 1.0]} />
            <meshStandardMaterial color="#c8c0b0" roughness={0.8} />
        </mesh>
        {/* Gold ring accent */}
        <mesh position={[0, -2.5, 0]}>
            <torusGeometry args={[0.42, 0.025, 8, 32]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.1} emissive="#b8860b" emissiveIntensity={0.2} />
        </mesh>
    </group>
);

// INSTANCED ROPE POSTS
const RopePosts = ({ positions }: { positions: [number, number, number][] }) => {
    const postRef = useRef<THREE.InstancedMesh>(null);
    const topRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        if (!postRef.current || !topRef.current) return;
        positions.forEach((pos, i) => {
            dummy.position.set(pos[0], pos[1], pos[2]);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            postRef.current!.setMatrixAt(i, dummy.matrix);

            dummy.position.set(pos[0], pos[1] + 0.78, pos[2]);
            dummy.updateMatrix();
            topRef.current!.setMatrixAt(i, dummy.matrix);
        });
        postRef.current.instanceMatrix.needsUpdate = true;
        topRef.current.instanceMatrix.needsUpdate = true;
    }, [positions]);

    return (
        <>
            <instancedMesh ref={postRef} args={[null as any, null as any, positions.length]} castShadow>
                <cylinderGeometry args={[0.045, 0.055, 1.5, 8]} />
                <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </instancedMesh>
            <instancedMesh ref={topRef} args={[null as any, null as any, positions.length]}>
                <sphereGeometry args={[0.09, 8, 8]} />
                <meshStandardMaterial color="#d4a017" metalness={0.85} roughness={0.1} emissive="#d4a017" emissiveIntensity={0.1} />
            </instancedMesh>
        </>
    );
};

// BENCH — teak wood museum bench
const Bench = ({ position, rotY = 0 }: { position: [number, number, number], rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.1, 0.65]} />
            <meshStandardMaterial color="#5c3318" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.88, -0.26]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[2.8, 0.55, 0.08]} />
            <meshStandardMaterial color="#5c3318" roughness={0.8} />
        </mesh>
        {[[-1.25, -0.28], [1.25, -0.28], [-1.25, 0.28], [1.25, 0.28]].map(([x, z], i) => (
            <mesh key={i} position={[x as number, 0.24, z as number]}>
                <boxGeometry args={[0.08, 0.5, 0.08]} />
                <meshStandardMaterial color="#3d2200" roughness={0.9} />
            </mesh>
        ))}
        <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[2.85, 0.04, 0.68]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
        </mesh>
    </group>
);

// WALL CLOCK — static (no useFrame)
const WallClock = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
        <mesh>
            <cylinderGeometry args={[0.55, 0.55, 0.07, 24]} />
            <meshStandardMaterial color="#f0ebe0" roughness={0.6} />
        </mesh>
        <mesh>
            <torusGeometry args={[0.55, 0.045, 8, 32]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
        {[0, 1, 2, 3].map(i => (
            <mesh key={i} position={[Math.sin(i * Math.PI / 2) * 0.44, Math.cos(i * Math.PI / 2) * 0.44, 0.04]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshStandardMaterial color="#1a1208" />
            </mesh>
        ))}
        <mesh position={[0.08, 0.12, 0.05]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.035, 0.28, 0.02]} />
            <meshStandardMaterial color="#1a1208" />
        </mesh>
        <mesh position={[-0.06, 0.17, 0.06]} rotation={[0, 0, 0.8]}>
            <boxGeometry args={[0.022, 0.38, 0.018]} />
            <meshStandardMaterial color="#1a1208" />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
            <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} />
        </mesh>
    </group>
);

// CCTV — static prop
const CCTV = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
        <mesh>
            <boxGeometry args={[0.1, 0.14, 0.1]} />
            <meshStandardMaterial color="#1c1c1c" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.08, 0.09]}>
            <boxGeometry args={[0.14, 0.09, 0.22]} />
            <meshStandardMaterial color="#141414" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0.046, -0.06, 0.2]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshStandardMaterial color="#ff2222" emissive="#ff2222" emissiveIntensity={1.2} />
        </mesh>
    </group>
);

// FIRE EXTINGUISHER
const FireExtinguisher = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.075, 0.64, 10]} />
            <meshStandardMaterial color="#cc1111" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.046, 0.07, 0.11, 8]} />
            <meshStandardMaterial color="#888" metalness={0.7} />
        </mesh>
    </group>
);

// HERITAGE VASE — decorative plinth
const HeritageVase = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.75, 0.8, 0.75]} />
            <meshStandardMaterial color="#111" roughness={0.15} metalness={0.85} />
        </mesh>
        <mesh position={[0, 1.22, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.36, 0.88, 14]} />
            <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.08} emissive="#b8860b" emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[0, 1.7, 0]}>
            <sphereGeometry args={[0.28, 14, 14]} />
            <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.06} />
        </mesh>
    </group>
);


// ═══════════════════════════════════════════════════════════════
// TRADITIONAL JAVANESE INSTRUMENTS — Pure Three.js geometry props
// ═══════════════════════════════════════════════════════════════

// BONANG POT — single gong kettle
const BonanGPot = ({ pos }: { pos: [number, number, number] }) => (
    <group position={pos}>
        {/* Pot body */}
        <mesh>
            <cylinderGeometry args={[0.16, 0.13, 0.12, 14]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Raised nub (pencon) */}
        <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.055, 10, 10]} />
            <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.08} emissive="#b8860b" emissiveIntensity={0.1} />
        </mesh>
        {/* Rim shadow ring */}
        <mesh position={[0, -0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.12, 0.16, 14, 1]} />
            <meshBasicMaterial color="#5a3000" transparent opacity={0.4} />
        </mesh>
    </group>
);

// BONANG RACK — row of gong kettles on a wooden frame
const BonanRack = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Frame rails */}
        <mesh position={[0, 0.55, -0.28]}>
            <boxGeometry args={[2.4, 0.06, 0.06]} />
            <meshStandardMaterial color="#3a1e00" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0.28]}>
            <boxGeometry args={[2.4, 0.06, 0.06]} />
            <meshStandardMaterial color="#3a1e00" roughness={0.8} />
        </mesh>
        {/* Legs */}
        {([-1.1, 1.1] as number[]).map((x, i) =>
            ([-0.28, 0.28] as number[]).map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x, 0.28, z]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.55, 7]} />
                    <meshStandardMaterial color="#3a1e00" roughness={0.85} />
                </mesh>
            ))
        )}
        {/* Bonang pots in 2 rows × 5 */}
        {[-0.88, -0.44, 0, 0.44, 0.88].map((x, i) => (
            <BonanGPot key={`f-${i}`} pos={[x, 0.62, -0.15]} />
        ))}
        {[-0.88, -0.44, 0, 0.44, 0.88].map((x, i) => (
            <BonanGPot key={`b-${i}`} pos={[x, 0.62, 0.15]} />
        ))}
    </group>
);

// GONG AGENG — large suspended gong
const GongAgeng = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
    });
    return (
        <group position={position} ref={ref}>
            {/* Frame legs */}
            {[-0.7, 0.7].map((x, i) => (
                <group key={i} position={[x, 0, 0]}>
                    <mesh position={[0, 1.1, 0]}>
                        <cylinderGeometry args={[0.045, 0.06, 2.2, 8]} />
                        <meshStandardMaterial color="#2a1400" roughness={0.85} />
                    </mesh>
                    {/* Gold cap */}
                    <mesh position={[0, 2.22, 0]}>
                        <sphereGeometry args={[0.07, 8, 8]} />
                        <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Foot */}
                    <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.12, 0.08, 0.08, 8]} />
                        <meshStandardMaterial color="#1a0a00" roughness={0.9} />
                    </mesh>
                </group>
            ))}
            {/* Top crossbar */}
            <mesh position={[0, 2.18, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 1.55, 8]} />
                <meshStandardMaterial color="#2a1400" roughness={0.85} />
            </mesh>
            {/* Decorative carving on crossbar */}
            {[-0.4, 0, 0.4].map((x, i) => (
                <mesh key={i} position={[x, 2.18, 0]}>
                    <torusGeometry args={[0.055, 0.015, 8, 16]} />
                    <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
                </mesh>
            ))}
            {/* Suspension rope */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 1.3, 5]} />
                <meshStandardMaterial color="#c89040" roughness={0.9} />
            </mesh>
            {/* Gong disc */}
            <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.62, 0.62, 0.045, 32]} />
                <meshStandardMaterial color="#b8860b" metalness={0.95} roughness={0.06} emissive="#804800" emissiveIntensity={0.08} />
            </mesh>
            {/* Pencon (center boss) */}
            <mesh position={[0, 0.82, 0.025]}>
                <sphereGeometry args={[0.11, 12, 12]} />
                <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.04} emissive="#b8860b" emissiveIntensity={0.2} />
            </mesh>
            {/* Gong rim ring */}
            <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.60, 0.025, 8, 32]} />
                <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    );
};

// SARON — xylophone with bronze keys on wooden frame
const Saron = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Frame box */}
        <mesh position={[0, 0.28, 0]}>
            <boxGeometry args={[1.8, 0.14, 0.38]} />
            <meshStandardMaterial color="#3a1a00" roughness={0.8} />
        </mesh>
        {/* Bronze keys */}
        {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} position={[-0.6 + i * 0.2, 0.38, 0]}>
                <boxGeometry args={[0.17, 0.06, 0.32]} />
                <meshStandardMaterial color="#d4a017" metalness={0.85} roughness={0.18} emissive="#b86000" emissiveIntensity={0.05} />
            </mesh>
        ))}
        {/* Legs */}
        {([-0.82, 0.82] as number[]).map((x, i) =>
            ([-0.15, 0.15] as number[]).map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x, 0.12, z]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.24, 7]} />
                    <meshStandardMaterial color="#2a1000" roughness={0.9} />
                </mesh>
            ))
        )}
    </group>
);

// GAMELAN SET — full ensemble on a raised platform in the center
const GamelanSet = ({ position }: { position: [number, number, number] }) => (
    <group position={[position[0], position[1], position[2]]}>
        {/* Raised wooden platform */}
        <mesh position={[0, 0.075, 0]} receiveShadow>
            <boxGeometry args={[9, 0.15, 6.5]} />
            <meshStandardMaterial color="#2a1400" roughness={0.7} metalness={0.05} />
        </mesh>
        {/* Platform border gold strip */}
        <mesh position={[0, 0.154, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4.4, 4.6, 4, 1]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Carpet on platform */}
        <mesh position={[0, 0.152, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8.6, 6.1]} />
            <meshStandardMaterial color="#7a1a1a" roughness={1} />
        </mesh>
        {/* Carpet pattern lines */}
        {[-2, 0, 2].map((x, i) => (
            <mesh key={i} position={[x, 0.155, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.03, 5.8]} />
                <meshBasicMaterial color="#b8860b" />
            </mesh>
        ))}

        {/* Bonang Barung rack — left side */}
        <BonanRack position={[-3.2, 0.15, -1.5]} rotY={0} />
        {/* Bonang Penerus rack — right side */}
        <BonanRack position={[3.2, 0.15, -1.5]} rotY={Math.PI} />

        {/* Gong Ageng — back center */}
        <GongAgeng position={[0, 0.15, -2.4]} />

        {/* Saron pair — front */}
        <Saron position={[-2.2, 0.15, 1.2]} rotY={0} />
        <Saron position={[2.2, 0.15, 1.2]} rotY={0} />
    </group>
);

// KENDANG — barrel drum with rope lacings
const Kendang = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Stand legs */}
        {[-0.22, 0.22].map((x, i) => (
            <mesh key={i} position={[x, 0.22, 0]} rotation={[0, 0, i === 0 ? 0.18 : -0.18]}>
                <cylinderGeometry args={[0.02, 0.025, 0.45, 7]} />
                <meshStandardMaterial color="#2a1000" roughness={0.85} />
            </mesh>
        ))}
        <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.48, 0.04, 0.14]} />
            <meshStandardMaterial color="#2a1000" roughness={0.85} />
        </mesh>
        {/* Main drum body — barrel shape */}
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.1, 0.92, 14]} />
            <meshStandardMaterial color="#8b4513" roughness={0.65} metalness={0.05} />
        </mesh>
        {/* Left drum head */}
        <mesh position={[-0.47, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.102, 0.102, 0.025, 14]} />
            <meshStandardMaterial color="#c8a878" roughness={0.9} />
        </mesh>
        {/* Right drum head (larger) */}
        <mesh position={[0.47, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.142, 0.142, 0.025, 14]} />
            <meshStandardMaterial color="#c8a878" roughness={0.9} />
        </mesh>
        {/* Rope lacings */}
        {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * Math.PI * 2;
            return (
                <mesh key={i} position={[0, 0.5 + Math.cos(angle) * 0.105, Math.sin(angle) * 0.105]}
                    rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.006, 0.006, 0.88, 4]} />
                    <meshStandardMaterial color="#8b6914" roughness={0.9} />
                </mesh>
            );
        })}
    </group>
);

// ANGKLUNG — bamboo frame instrument with hanging tubes
const AngklungGroup = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Stand base */}
        <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.8, 0.12, 0.35]} />
            <meshStandardMaterial color="#2a1400" roughness={0.8} />
        </mesh>
        {/* Vertical poles */}
        {([-0.8, 0.8] as number[]).map((x, i) => (
            <mesh key={i} position={[x, 1.0, 0]}>
                <cylinderGeometry args={[0.035, 0.04, 2.0, 8]} />
                <meshStandardMaterial color="#5a3200" roughness={0.75} />
            </mesh>
        ))}
        {/* Horizontal crossbar */}
        <mesh position={[0, 1.92, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 1.65, 8]} />
            <meshStandardMaterial color="#4a2800" roughness={0.75} />
        </mesh>
        {/* Hanging Angklung units — 5 bamboo sets */}
        {[-0.56, -0.28, 0, 0.28, 0.56].map((x, i) => {
            const heightsA = [0.55 + i * 0.06, 0.45 + i * 0.05];
            return (
                <group key={i} position={[x, 1.88, 0]}>
                    {/* Suspension string */}
                    <mesh position={[0, -0.08, 0]}>
                        <cylinderGeometry args={[0.004, 0.004, 0.16, 4]} />
                        <meshStandardMaterial color="#a07040" roughness={0.9} />
                    </mesh>
                    {/* Bamboo frame bar */}
                    <mesh position={[0, -0.18, 0]}>
                        <boxGeometry args={[0.18, 0.022, 0.022]} />
                        <meshStandardMaterial color="#8b6914" roughness={0.7} />
                    </mesh>
                    {/* Two bamboo tubes of different heights */}
                    {heightsA.map((h, j) => (
                        <mesh key={j} position={[(j - 0.5) * 0.078, -0.18 - h / 2, 0]}>
                            <cylinderGeometry args={[0.022, 0.022, h, 7]} />
                            <meshStandardMaterial color={j === 0 ? '#c8a040' : '#a07828'} roughness={0.6} />
                        </mesh>
                    ))}
                    {/* Bottom node ring on each tube */}
                    {heightsA.map((h, j) => (
                        <mesh key={`r-${j}`} position={[(j - 0.5) * 0.078, -0.18 - h + 0.04, 0]}>
                            <torusGeometry args={[0.023, 0.005, 6, 12]} />
                            <meshStandardMaterial color="#7a5010" roughness={0.8} />
                        </mesh>
                    ))}
                </group>
            );
        })}
    </group>
);

// BUTTERFLY — optimized (skip 1 frame)

export const Butterfly = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    const wingL = useRef<THREE.Group>(null);
    const wingR = useRef<THREE.Group>(null);
    const frame = useRef(0);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame(({ clock }) => {
        frame.current++;
        if (frame.current % 2 !== 0) return;
        if (!ref.current) return;
        const t = clock.getElapsedTime() + offset;
        ref.current.position.x = position[0] + Math.sin(t * 0.22) * 5;
        ref.current.position.y = position[1] + Math.sin(t * 0.45) * 0.5;
        ref.current.position.z = position[2] + Math.cos(t * 0.18) * 5;
        const flap = Math.abs(Math.sin(t * 7.5)) * 1.15;
        if (wingL.current) wingL.current.rotation.y = flap;
        if (wingR.current) wingR.current.rotation.y = -flap;
    });

    return (
        <group ref={ref} position={position}>
            <group ref={wingL}>
                <mesh position={[-0.16, 0, 0]}>
                    <planeGeometry args={[0.3, 0.28]} />
                    <meshStandardMaterial color="#d4580a" side={THREE.DoubleSide} roughness={0.8} />
                </mesh>
            </group>
            <group ref={wingR}>
                <mesh position={[0.16, 0, 0]}>
                    <planeGeometry args={[0.3, 0.28]} />
                    <meshStandardMaterial color="#d4580a" side={THREE.DoubleSide} roughness={0.8} />
                </mesh>
            </group>
            <mesh>
                <cylinderGeometry args={[0.02, 0.02, 0.18, 6]} />
                <meshStandardMaterial color="#3d1a00" />
            </mesh>
        </group>
    );
};

// LUXURIOUS CHANDELIER - Elegant golden chandelier with warm glow (optimized - no dynamic light)
const LuxuriousChandelier = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Central chain */}
        <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Main central sphere - emissive for glow effect */}
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.05} emissive="#fff8dc" emissiveIntensity={0.8} />
        </mesh>
        {/* Upper ring */}
        <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.035, 8, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Lower ring */}
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.035, 8, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Decorative arms - 8 branches */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 0.45;
            const z = Math.sin(rad) * 0.45;
            return (
                <group key={i}>
                    {/* Arm */}
                    <mesh position={[x * 0.6, 0.2, z * 0.6]} rotation={[0, -rad, 0]}>
                        <cylinderGeometry args={[0.012, 0.012, 0.4, 6]} />
                        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.15} />
                    </mesh>
                    {/* Crystal ball at end - emissive for glow */}
                    <mesh position={[x, 0.45, z]}>
                        <sphereGeometry args={[0.08, 10, 10]} />
                        <meshStandardMaterial color="#f5f5f5" transparent opacity={0.85} roughness={0.1} metalness={0.3} emissive="#fffacd" emissiveIntensity={0.6} />
                    </mesh>
                </group>
            );
        })}
        {/* Removed pointLight for performance - using emissive materials instead */}
    </group>
);

// BIRTHDAY SIGN - Elegant hanging sign with text
const BirthdaySign = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Decorative chains */}
        {[-1.5, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 0.19, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 1.6, 6]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
        ))}
        {/* Sign board - elegant oval */}
        <mesh>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Gold border */}
        <mesh>
            <torusGeometry args={[1.22, 0.04, 8, 32]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Text - Main */}
        <Text
            font="/fonts/Roboto-Bold.ttf"
            position={[0, 0.15, 0.12]}
            fontSize={0.35}
            color="#ffd700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
        >
            SELAMAT
        </Text>
        <Text
            font="/fonts/Roboto-Bold.ttf"
            position={[0, -0.25, 0.12]}
            fontSize={0.45}
            color="#ffd700"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.018}
            outlineColor="#000000"
        >
            ULANG TAHUN
        </Text>
        {/* Subtitle */}
        <Text
            font="/fonts/Roboto-Regular.ttf"
            position={[0, -0.75, 0.12]}
            fontSize={0.22}
            color="#f5f5f5"
            anchorX="center"
            anchorY="middle"
        >
            NAYLA ❤️
        </Text>
    </group>
);

// CENTER CAKE TABLE - Elegant table with cake and chandelier
const CenterCakeTable = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Elegant round table - white marble style */}
        <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[2.2, 2.0, 0.12, 32]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.15} metalness={0.3} />
        </mesh>
        {/* Gold trim ring */}
        <mesh position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.1, 0.04, 8, 32]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Table leg - elegant column */}
        <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 0.7, 16]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.4} />
        </mesh>
        {/* Table base */}
        <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[1.0, 1.2, 0.08, 24]} />
            <meshStandardMaterial color="#ffd700" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Birthday Cake - elegant 3-tier */}
        <group position={[0, 0.84, 0]}>
            {/* Bottom tier */}
            <mesh position={[0, 0.15, 0]} castShadow>
                <cylinderGeometry args={[0.9, 1.0, 0.3, 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.25} />
            </mesh>
            {/* Middle tier */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.65, 0.75, 0.3, 20]} />
                <meshStandardMaterial color="#fff8f0" roughness={0.25} />
            </mesh>
            {/* Top tier */}
            <mesh position={[0, 0.85, 0]} castShadow>
                <cylinderGeometry args={[0.4, 0.5, 0.3, 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.25} />
            </mesh>
            {/* Gold bands between tiers */}
            <mesh position={[0, 0.32, 0]}>
                <torusGeometry args={[0.95, 0.025, 8, 24]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.67, 0]}>
                <torusGeometry args={[0.7, 0.025, 8, 24]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Candles - 6 elegant candles */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 0.5;
                const z = Math.sin(rad) * 0.5;
                return (
                    <group key={i}>
                        <mesh position={[x, 1.05, z]} castShadow>
                            <cylinderGeometry args={[0.02, 0.025, 0.25, 8]} />
                            <meshStandardMaterial color="#ffffff" />
                        </mesh>
                        <mesh position={[x, 1.22, z]}>
                            <sphereGeometry args={[0.04, 8, 8]} />
                            <meshStandardMaterial color="#ffcc00" emissive="#ff8800" emissiveIntensity={1.5} />
                        </mesh>
                    </group>
                );
            })}
            {/* Number 18 topper */}
            <group position={[0, 1.45, 0]}>
                <mesh position={[-0.12, 0, 0]}>
                    <boxGeometry args={[0.1, 0.35, 0.05]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} emissive="#ffdd88" emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} emissive="#ffdd88" emissiveIntensity={0.3} />
                </mesh>
            </group>
        </group>

        {/* Elegant candles on table corners */}
        <ElegantCandle position={[-1.5, 0.81, 0.8]} />
        <ElegantCandle position={[1.5, 0.81, 0.8]} />
        <ElegantCandle position={[-1.5, 0.81, -0.8]} />
        <ElegantCandle position={[1.5, 0.81, -0.8]} />

        {/* Soft contact shadow */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.25} />
        </mesh>
    </group>
);

// STANDALONE BIRTHDAY CAKE - For the table near entrance
const BirthdayCake = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Bottom tier */}
        <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.7, 0.75, 0.24, 20]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>
        {/* Middle tier */}
        <mesh position={[0, 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.6, 0.24, 20]} />
            <meshStandardMaterial color="#fff8f0" roughness={0.25} />
        </mesh>
        {/* Top tier */}
        <mesh position={[0, 0.64, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.4, 0.24, 20]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} />
        </mesh>
        {/* Gold bands */}
        <mesh position={[0, 0.24, 0]}>
            <torusGeometry args={[0.72, 0.02, 8, 24]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
            <torusGeometry args={[0.52, 0.02, 8, 24]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Candles - 4 candles */}
        {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 0.35;
            const z = Math.sin(rad) * 0.35;
            return (
                <group key={i}>
                    <mesh position={[x, 0.78, z]} castShadow>
                        <cylinderGeometry args={[0.018, 0.022, 0.2, 8]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    <mesh position={[x, 0.92, z]}>
                        <sphereGeometry args={[0.035, 8, 8]} />
                        <meshStandardMaterial color="#ffcc00" emissive="#ff8800" emissiveIntensity={1.5} />
                    </mesh>
                    {/* Soft candle glow - lightweight */}
                    <pointLight position={[x, 0.95, z]} intensity={0.3} color="#ffaa00" distance={2} />
                </group>
            );
        })}
        {/* Number 18 topper - simplified */}
        <group position={[0, 1.15, 0]}>
            <mesh position={[-0.08, 0, 0]}>
                <boxGeometry args={[0.08, 0.28, 0.04]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} emissive="#ffdd88" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} emissive="#ffdd88" emissiveIntensity={0.3} />
            </mesh>
        </group>
    </group>
);

// ELEGANT ROSE PETAL - Scattered on floor
const RosePetal = ({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) => (
    <group position={position} rotation={rotation || [0, 0, 0]}>
        <mesh castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#8b0000" roughness={0.6} metalness={0.1} />
        </mesh>
    </group>
);

// FLOATING SPARKLE - Optimized with instancing-friendly approach
const FloatingSparkle = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!ref.current) return;
        timeRef.current += delta;
        const t = timeRef.current + offset;
        // Optimized: only update position, not rotation
        ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    });

    return (
        <group ref={ref} position={position}>
            <mesh>
                <octahedronGeometry args={[0.06, 0]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
};

// ELEGANT FLOATING PETAL - Optimized animation
const FloatingPetal = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!ref.current) return;
        timeRef.current += delta;
        const t = timeRef.current + offset;
        ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
    });

    return (
        <group ref={ref} position={position}>
            <mesh castShadow>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#c41e3a" roughness={0.5} metalness={0.15} />
            </mesh>
        </group>
    );
};

// ELEGANT CANDLE - Warm ambient candle light
const ElegantCandle = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.035, 0.15, 8]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={2} />
        </mesh>
        {/* Soft glow */}
        <pointLight position={[0, 0.15, 0]} intensity={0.5} color="#ffaa00" distance={3} />
    </group>
);

// PONY CHARACTER WITH BAG - Standing on center table
const PonyWithBag = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Pony body - simplified geometric */}
        <group position={[0, 0.6, 0]}>
            {/* Body */}
            <mesh castShadow position={[0, 0.3, 0]}>
                <boxGeometry args={[0.5, 0.4, 0.7]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Neck */}
            <mesh castShadow position={[0, 0.65, -0.25]}>
                <boxGeometry args={[0.25, 0.4, 0.25]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Head */}
            <mesh castShadow position={[0, 0.95, -0.3]}>
                <boxGeometry args={[0.3, 0.35, 0.4]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Ears */}
            <mesh castShadow position={[-0.1, 1.15, -0.3]}>
                <coneGeometry args={[0.05, 0.15, 8]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh castShadow position={[0.1, 1.15, -0.3]}>
                <coneGeometry args={[0.05, 0.15, 8]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Mane (hair) */}
            <mesh castShadow position={[0, 1.0, -0.2]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color="#FFD700" roughness={0.6} metalness={0.1} />
            </mesh>
            {/* Legs */}
            <mesh castShadow position={[-0.15, 0.1, 0.25]}>
                <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh castShadow position={[0.15, 0.1, 0.25]}>
                <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh castShadow position={[-0.15, 0.1, -0.25]}>
                <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh castShadow position={[0.15, 0.1, -0.25]}>
                <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                <meshStandardMaterial color="#FFB6C1" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Tail */}
            <mesh castShadow position={[0, 0.5, 0.4]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshStandardMaterial color="#FFD700" roughness={0.6} metalness={0.1} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.12, 0.98, -0.48]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} />
            </mesh>
            <mesh position={[0.12, 0.98, -0.48]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} />
            </mesh>
        </group>
        
        {/* Large Bag next to pony on table */}
        <group position={[0.5, 0.45, 0.3]}>
            {/* Bag body */}
            <mesh castShadow>
                <boxGeometry args={[0.4, 0.5, 0.3]} />
                <meshStandardMaterial color="#8B4513" roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Bag handle */}
            <mesh castShadow position={[0, 0.35, 0]}>
                <torusGeometry args={[0.12, 0.03, 8, 16]} />
                <meshStandardMaterial color="#8B4513" roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Bag strap */}
            <mesh castShadow position={[0, 0.15, 0.16]}>
                <boxGeometry args={[0.35, 0.25, 0.03]} />
                <meshStandardMaterial color="#A0522D" roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Buckle */}
            <mesh castShadow position={[0, 0.15, 0.175]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.8} />
            </mesh>
        </group>
        
        {/* Shadow under pony on table */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.2, 1.5]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.2} />
        </mesh>
    </group>
);

// FLOATING BIRTHDAY TEXT ABOVE CAKE - Angled for visibility from all sides
const FloatingBirthdayText = () => {
    return (
        <group position={[0, 4.5, 2]} rotation={[0.15, 0, 0]}>
            {/* Main text - SELAMAT ULANG TAHUN */}
            <Text
                font="/fonts/Roboto-Bold.ttf"
                position={[0, 0.9, 0.3]}
                fontSize={0.55}
                color="#ffd700"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
                letterSpacing={0.18}
            >
                SELAMAT ULANG TAHUN
            </Text>
            
            {/* Name - NAYLA (larger, centered) */}
            <Text
                font="/fonts/Roboto-Bold.ttf"
                position={[0, 0.15, 0.3]}
                fontSize={1.1}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.025}
                outlineColor="#000000"
                letterSpacing={0.15}
            >
                NAYLA
            </Text>
            
            {/* Age - 18 (centered, forward) */}
            <Text
                font="/fonts/Roboto-Bold.ttf"
                position={[0, -0.75, 0.3]}
                fontSize={0.75}
                color="#ffd700"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
                letterSpacing={0.2}
            >
                18
            </Text>
        </group>
    );
};

// MONOCHROME BALLOON - Black, white, gold only
const MonoBalloon = ({ position, color = "#ffffff" }: { position: [number, number, number], color?: string }) => (
    <group position={position}>
        <mesh castShadow>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        </mesh>
        {/* String */}
        <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 1, 4]} />
            <meshBasicMaterial color="#333333" />
        </mesh>
    </group>
);

// BIRTHDAY HAT - Festive cone hat
const BirthdayHat = ({ position, color = "#ffd700" }: { position: [number, number, number], color?: string }) => (
    <group position={position}>
        {/* Cone */}
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.2, 0.5, 8]} />
            <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
        {/* Brim */}
        <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 12]} />
            <meshStandardMaterial color={color} roughness={0.4} />
        </mesh>
        {/* Pom pom */}
        <mesh position={[0, 0.52, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ff69b4" roughness={0.5} />
        </mesh>
    </group>
);

// HANGING LANTERN - Decorative ceiling lantern
const HangingLantern = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Chain */}
        <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 1, 6]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Lantern body */}
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.25, 12, 12]} />
            <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.5} emissive="#ffd700" emissiveIntensity={0.3} />
        </mesh>
        {/* Top cap */}
        <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.08, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
    </group>
);

// CONFETTI SPHERE - Static decorative confetti cluster (no animation for performance)
const ConfettiCluster = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const colors = ["#ffd700", "#ffffff", "#1a1a1a", "#ff69b4", "#87ceeb", "#ffd700"];
            return (
                <mesh key={i} position={[Math.cos(rad) * 0.15, Math.sin(i * 0.5) * 0.1, Math.sin(rad) * 0.15]}>
                    <boxGeometry args={[0.08, 0.02, 0.04]} />
                    <meshStandardMaterial color={colors[i]} roughness={0.5} />
                </mesh>
            );
        })}
    </group>
);

// CONTACT SHADOW PLANE - Lightweight fake shadow
const ContactShadow = ({ position, size = 1.5 }: { position: [number, number, number], size?: number }) => (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
    </mesh>
);

// ROUND PARTY TABLE with plates - fixed height to sit properly on floor
const RoundPartyTable = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        {/* Table top - proper standing height (0.75m) */}
        <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 0.08, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.1} />
        </mesh>
        {/* Table leg */}
        <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 0.7, 12]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Table base */}
        <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.08, 16]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
        </mesh>
        
        {/* Plates on table - arranged in circle */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 0.9;
            const z = Math.sin(rad) * 0.9;
            return (
                <mesh key={i} position={[x, 0.79, z]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.015, 12]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.1} />
                </mesh>
            );
        })}
        
        {/* Center decoration - small flower vase */}
        <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.15, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Flowers */}
        <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffddaa" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Contact shadow */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.25} />
        </mesh>
    </group>
);

// GRAND TITLE - Birthday Theme with Monochrome Style
const GrandTitle = () => (
    <group position={[0, 5, -19.5]}>
        {/* Contact shadows under decorations */}
        <ContactShadow position={[-3, -2.3, 0]} size={1} />
        <ContactShadow position={[3, -2.3, 0]} size={1} />
        <ContactShadow position={[-2, -1.6, 0]} size={0.8} />
        <ContactShadow position={[2, -1.6, 0]} size={0.8} />
        
        {/* Monochrome balloons - white, black, gold only */}
        <MonoBalloon position={[-3, 1.5, 0]} color="#ffffff" />
        <MonoBalloon position={[3, 1.5, 0]} color="#1a1a1a" />
        <MonoBalloon position={[-2, 2.2, 0]} color="#ffd700" />
        <MonoBalloon position={[2, 2.2, 0]} color="#ffffff" />
        
       
        <Text
            font="/fonts/Roboto-Bold.ttf"
            position={[0, -0.9, 0]}
            fontSize={0.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
        >
            NAYLA yang ke-18
        </Text>
        <Text
            font="/fonts/Roboto-Regular.ttf"
            position={[0, -1.5, 0]}
            fontSize={0.22}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.25}
        >
            Museum Kenangan Spesial
        </Text>
        
        {/* Contact shadow for cake */}
        <ContactShadow position={[0, 0.01, 2]} size={2.5} />
        
        {/* Round table under the cake - proper floor height */}
        <mesh position={[0, 0.75, 2]}>
            <cylinderGeometry args={[1.8, 1.8, 0.08, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Table leg */}
        <mesh position={[0, 0.35, 2]}>
            <cylinderGeometry args={[0.12, 0.15, 0.6, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Table base */}
        <mesh position={[0, 0.04, 2]}>
            <cylinderGeometry args={[0.8, 0.8, 0.08, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Plates on the table */}
        <mesh position={[-0.8, 0.81, 1.5]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0.8, 0.81, 1.5]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.81, 2.8]}>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        
        {/* Birthday cake on the table - properly elevated */}
        <BirthdayCake position={[0, 0.83, 2]} />

        {/* Elegant candles around the table */}
        <ElegantCandle position={[-1.8, 0.81, 1.2]} />
        <ElegantCandle position={[1.8, 0.81, 1.2]} />
        <ElegantCandle position={[-1.5, 0.81, 2.5]} />
        <ElegantCandle position={[1.5, 0.81, 2.5]} />

        {/* Rose petals scattered around */}
        <RosePetal position={[-2, 0.02, 1]} rotation={[0.5, 0.3, 0.2]} />
        <RosePetal position={[2, 0.02, 1.5]} rotation={[0.8, 0.1, 0.5]} />
        <RosePetal position={[-1.5, 0.02, 2.8]} rotation={[0.3, 0.6, 0.1]} />
        <RosePetal position={[1.5, 0.02, 3]} rotation={[0.6, 0.4, 0.3]} />
        <RosePetal position={[0, 0.02, 1.8]} rotation={[0.4, 0.2, 0.7]} />

        {/* Golden decorative bars */}
        <mesh position={[0, 2.65, 0]}>
            <boxGeometry args={[7, 0.04, 0.02]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-3.5, 2.65, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[3.5, 2.65, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
    </group>
);

// WALL DECORATIONS - Birthday banners and balloons on walls
const WallDecorations = () => (
    <>
        {/* North Wall Decorations */}
        <mesh position={[0, 6, -59.8]}>
            <boxGeometry args={[40, 1, 0.1]} />
            <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[-15, 5, -59.5]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[15, 5, -59.5]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
        </mesh>
        
        {/* South Wall Decorations */}
        <mesh position={[0, 6, 59.8]}>
            <boxGeometry args={[40, 1, 0.1]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[-12, 5.5, 59.5]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[12, 5.5, 59.5]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
        </mesh>
        
        {/* East Wall Decorations */}
        <mesh position={[59.8, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[30, 1, 0.1]} />
            <meshStandardMaterial color="#ffd700" metalness={0.6} roughness={0.3} />
        </mesh>
        {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const z = Math.cos(rad) * 10;
            const y = 5 + Math.sin(rad) * 1;
            const colors = ["#ffffff", "#1a1a1a", "#ffd700", "#ffffff", "#1a1a1a"];
            return (
                <mesh key={i} position={[59.5, y, z]}>
                    <sphereGeometry args={[0.35, 12, 12]} />
                    <meshStandardMaterial color={colors[i]} roughness={0.2} metalness={0.1} />
                </mesh>
            );
        })}
        
        {/* West Wall Decorations */}
        <mesh position={[-59.8, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[30, 1, 0.1]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {[36, 108, 180, 252, 324].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const z = Math.cos(rad) * 10;
            const y = 5 + Math.sin(rad) * 1;
            const colors = ["#ffd700", "#ffffff", "#1a1a1a", "#ffd700", "#ffffff"];
            return (
                <mesh key={i} position={[-59.5, y, z]}>
                    <sphereGeometry args={[0.35, 12, 12]} />
                    <meshStandardMaterial color={colors[i]} roughness={0.2} metalness={0.1} />
                </mesh>
            );
        })}
        
        {/* Corner balloon stacks */}
        {[[-55, -55], [55, -55], [-55, 55], [55, 55]].map(([x, z], i) => (
            <group key={i}>
                <mesh position={[x, 3, z]}>
                    <sphereGeometry args={[0.6, 16, 16]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#ffd700" : "#ffffff"} roughness={0.2} metalness={0.3} />
                </mesh>
                <mesh position={[x, 4.2, z]}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#ffffff" : "#1a1a1a"} roughness={0.2} />
                </mesh>
                <mesh position={[x, 5.2, z]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#1a1a1a" : "#ffd700"} roughness={0.2} metalness={0.3} />
                </mesh>
            </group>
        ))}
    </>
);

// ELEGANT ROSE PETALS AND SPARKLES - Scattered around the museum (replaces gift boxes)
const RosePetalsAndSparkles = () => {
    const petalPositions = useMemo(() => {
        const positions: [number, number, number][] = [];
        // Scatter rose petals along the walk path and around tables
        for (let i = 0; i < 80; i++) {
            const angle = (i / 80) * Math.PI * 2;
            const radius = 10 + Math.random() * 40;
            const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 10;
            const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 10;
            positions.push([Math.max(-55, Math.min(55, x)), 0.02, Math.max(-55, Math.min(55, z))]);
        }
        return positions;
    }, []);

    const sparklePositions = useMemo(() => {
        const positions: [number, number, number][] = [];
        // Floating sparkles at various heights
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 15 + Math.random() * 35;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            positions.push([x, 1.5 + Math.random() * 3, z]);
        }
        return positions;
    }, []);

    return (
        <>
            {petalPositions.map((pos, i) => (
                <RosePetal 
                    key={`petal-${i}`} 
                    position={pos} 
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]} 
                />
            ))}
            {sparklePositions.map((pos, i) => (
                <FloatingSparkle key={`sparkle-${i}`} position={pos} />
            ))}
        </>
    );
};

// MAIN ENVIRONMENT EXPORT
export const Environment = ({ museumBatiks }: { museumBatiks: any[] }) => {
    const pillarPositions: [number, number, number][] = [
        [-22, 4.25, -28], [0, 4.25, -28], [22, 4.25, -28],
        [-22, 4.25, 0], [0, 4.25, 0], [22, 4.25, 0],
        [-22, 4.25, 28], [0, 4.25, 28], [22, 4.25, 28],
    ];

    const ropePositions = useMemo<[number, number, number][]>(() => {
        const p: [number, number, number][] = [];
        [-44, -33, -22, -11, 0, 11, 22, 33, 44].forEach(x => {
            p.push([x, 0.75, -56.5]);
            p.push([x, 0.75, 56.5]);
        });
        return p;
    }, []);

    return (
        <>
            <Floor />
            <Ceiling />
            <CeilingBeams />
            <CeilingLightPanels />

            {/* Walls */}
            <Wall position={[0, 4.25, -60]} />
            <Wall position={[0, 4.25, 60]} />
            <Wall position={[-60, 4.25, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[60, 4.25, 0]} rotation={[0, Math.PI / 2, 0]} />

            {/* Pillars */}
            {pillarPositions.map((p, i) => <Pillar key={i} position={p} />)}

            {/* Simplified Center carpet - non emissive for performance */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
                <planeGeometry args={[10, 110]} />
                <meshStandardMaterial color="#daa520" roughness={0.8} metalness={0.2} />
            </mesh>
            {/* Golden center stripe */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.009, 0]}>
                <planeGeometry args={[4, 110]} />
                <meshStandardMaterial color="#ffd700" roughness={0.6} metalness={0.4} />
            </mesh>

            {/* Rope barriers */}
            <RopePosts positions={ropePositions} />
            {/* Rope cables */}
            {[-44, -33, -22, -11, 0, 11, 22, 33, 44].map((x, i) => (
                <group key={i}>
                    <mesh position={[x, 0.92, -56.5]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.018, 0.018, 9.9, 8]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.8} />
                    </mesh>
                    <mesh position={[x, 0.92, 56.5]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.018, 0.018, 9.9, 8]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.8} />
                    </mesh>
                </group>
            ))}

            {/* Party Tables with Plates */}
            {/* Table 1 - near north wall */}
            <RoundPartyTable position={[-25, 0, -40]} />
            {/* Table 2 - near south wall */}
            <RoundPartyTable position={[25, 0, 40]} />
            {/* Table 3 - near east wall */}
            <RoundPartyTable position={[40, 0, -25]} />
            {/* Table 4 - near west wall */}
            <RoundPartyTable position={[-40, 0, 25]} />
            {/* Table 5 - center area */}
            <RoundPartyTable position={[0, 0, 25]} />
            {/* Table 6 - another position */}
            <RoundPartyTable position={[-30, 0, 0]} />

            {/* Birthday Wall Decorations */}
            <WallDecorations />

            {/* Elegant Rose Petals and Sparkles (replaces gift boxes) */}
            <RosePetalsAndSparkles />

            {/* Floating petals at head level */}
            {[-20, 0, 20].map((x, i) => (
                <FloatingPetal key={`fp-${i}`} position={[x, 1.8, -30]} />
            ))}
            {[-20, 0, 20].map((x, i) => (
                <FloatingPetal key={`fp2-${i}`} position={[x, 1.6, 30]} />
            ))}

            {/* Benches */}
            <Bench position={[-20, 0, -44]} />
            <Bench position={[0, 0, -44]} />
            <Bench position={[20, 0, -44]} />
            <Bench position={[0, 0, 44]} rotY={Math.PI} />

            {/* Vases */}
            {[[-5, -28], [5, -28], [-5, 0], [5, 0], [-5, 28], [5, 28]].map(([x, z], i) => (
                <HeritageVase key={i} position={[x, 0, z]} />
            ))}

            {/* Wall clocks */}
            <WallClock position={[-59.5, 5, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WallClock position={[59.5, 5, 0]} rotation={[0, -Math.PI / 2, 0]} />

            {/* CCTVs */}
            <CCTV position={[-55, 8, -55]} rotation={[0.4, Math.PI / 4, 0]} />
            <CCTV position={[55, 8, -55]} rotation={[0.4, -Math.PI / 4, 0]} />
            <CCTV position={[-55, 8, 55]} rotation={[0.4, Math.PI * 0.75, 0]} />
            <CCTV position={[55, 8, 55]} rotation={[0.4, -Math.PI * 0.75, 0]} />

            {/* Fire extinguishers */}
            <FireExtinguisher position={[-58, 0, -58]} />
            <FireExtinguisher position={[58, 0, -58]} />
            <FireExtinguisher position={[-58, 0, 58]} />
            <FireExtinguisher position={[58, 0, 58]} />

            {/* CENTERPIECE - Elegant Birthday Cake Table with Chandelier */}
            <LuxuriousChandelier position={[0, 7.2, 0]} />
            <BirthdaySign position={[0, 5.2, 0]} />
            <CenterCakeTable position={[0, 0, 0]} />
            
            {/* PONY WITH BAG on center table */}
            <PonyWithBag position={[0, 0.84, 0]} />
            
            {/* FLOATING BIRTHDAY TEXT above cake - angled for visibility */}
            <FloatingBirthdayText />

            {/* Optimized Hanging Lanterns - reduced for performance */}
            <HangingLantern position={[-20, 7.5, -20]} />
            <HangingLantern position={[20, 7.5, -20]} />
            <HangingLantern position={[-20, 7.5, 20]} />
            <HangingLantern position={[20, 7.5, 20]} />
            <HangingLantern position={[0, 7.5, -40]} />
            <HangingLantern position={[0, 7.5, 40]} />

            {/* Confetti Clusters on tables */}
            <ConfettiCluster position={[-25, 1.2, -40]} />
            <ConfettiCluster position={[25, 1.2, 40]} />
            <ConfettiCluster position={[40, 1.2, -25]} />
            <ConfettiCluster position={[-40, 1.2, 25]} />
            <ConfettiCluster position={[0, 1.2, 25]} />
            <ConfettiCluster position={[-30, 1.2, 0]} />
        </>
    );
};
