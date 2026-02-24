import React, { useRef, useEffect, useState } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface PaintingProps {
    batik: any;
    position: [number, number, number];
    rotation: [number, number, number];
    isVisited: boolean;
    onSelect: (b: any) => void;
}

// Create a fallback texture
const fallbackTexture = new THREE.Texture();
const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;
const ctx = canvas.getContext('2d');
if (ctx) {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, 56, 56);
}
fallbackTexture.image = canvas;
fallbackTexture.needsUpdate = true;

export const Painting = ({ batik, position, rotation, isVisited, onSelect }: PaintingProps) => {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [textureError, setTextureError] = useState(false);
    const groupRef = useRef<THREE.Group>(null);
    const labelRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    // Safe texture loading with error handling
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            batik.imageUrl,
            (loadedTexture) => {
                loadedTexture.colorSpace = THREE.SRGBColorSpace;
                setTexture(loadedTexture);
            },
            undefined,
            (error) => {
                console.warn('Failed to load texture:', batik.imageUrl, error);
                setTextureError(true);
                setTexture(fallbackTexture);
            }
        );
    }, [batik.imageUrl]);

    // Show/hide label based on distance
    useEffect(() => {
        const posVec = new THREE.Vector3(...position);
        const interval = setInterval(() => {
            if (!labelRef.current) return;
            const dist = camera.position.distanceTo(posVec);
            labelRef.current.visible = dist < 22;
        }, 150);
        return () => clearInterval(interval);
    }, [camera, position]);

    const displayTexture = texture || fallbackTexture;

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Soft contact shadow - lightweight */}
            <mesh position={[0, -3, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.15} />
            </mesh>

            {/* Elegant black frame with gold accent */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[4.6, 5.6, 0.3]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.4}
                    metalness={0.5}
                />
            </mesh>

            {/* Inner gold trim - elegant thin line */}
            <mesh position={[0, 0, 0.14]}>
                <boxGeometry args={[4.55, 5.55, 0.05]} />
                <meshStandardMaterial color="#b8860b" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Outer gold accent corners */}
            {[-2.2, 2.2].map((x, i) => 
                [-2.7, 2.7].map((y, j) => (
                    <mesh key={`${i}-${j}`} position={[x, y, 0.15]}>
                        <boxGeometry args={[0.15, 0.15, 0.03]} />
                        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} emissive="#ffd700" emissiveIntensity={0.2} />
                    </mesh>
                ))
            )}

            {/* Inner mount - soft white */}
            <mesh position={[0, 0, 0.16]} receiveShadow>
                <boxGeometry args={[4.3, 5.3, 0.04]} />
                <meshStandardMaterial color="#fafafa" roughness={0.7} />
            </mesh>

            {/* Main canvas */}
            <mesh position={[0, 0, 0.19]}>
                <planeGeometry args={[4.1, 5.1]} />
                <meshStandardMaterial
                    map={displayTexture}
                    roughness={0.4}
                    metalness={0.05}
                    color={textureError ? "#666" : "#ffffff"}
                />
            </mesh>

            {/* Elegant info plate - dark with gold text */}
            <mesh position={[0, -3.2, 0.18]}>
                <boxGeometry args={[3.8, 0.45, 0.06]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Gold accent line on plate */}
            <mesh position={[0, -2.98, 0.21]}>
                <boxGeometry args={[3.85, 0.03, 0.02]} />
                <meshStandardMaterial color="#ffd700" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Label group - elegant monochrome */}
            <group ref={labelRef} visible={false}>
                <mesh position={[0, -3.45, 0.20]}>
                    <boxGeometry args={[4.0, 1.2, 0.03]} />
                    <meshStandardMaterial color="#0f0f0f" transparent opacity={0.92} />
                </mesh>
                <mesh position={[0, -2.85, 0.21]}>
                    <boxGeometry args={[4.0, 0.025, 0.015]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.7} roughness={0.25} />
                </mesh>
                <Text
                    position={[0, -3.10, 0.235]}
                    font="/fonts/Roboto-Bold.ttf"
                    fontSize={0.20}
                    color="#ffd700"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3.8}
                    outlineWidth={0.006}
                    outlineColor="#000000"
                >
                    {batik.name}
                </Text>
                <Text
                    position={[0, -3.38, 0.235]}
                    font="/fonts/Roboto-Regular.ttf"
                    fontSize={0.12}
                    color="#e8e8e8"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3.8}
                    outlineWidth={0.004}
                    outlineColor="#000000"
                >
                    ✨ HAPPY BIRTHDAY NAYLA ✨
                </Text>
                <Text
                    position={[0, -3.58, 0.235]}
                    font="/fonts/Roboto-Regular.ttf"
                    fontSize={0.11}
                    color="#c0c0c0"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.004}
                    outlineColor="#000000"
                >
                    🎂 LIHAT KENANGAN 🎂
                </Text>
            </group>
        </group>
    );
};
