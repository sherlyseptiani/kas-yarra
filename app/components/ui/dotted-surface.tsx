'use client';

import { cn } from '@/app/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = React.ComponentProps<'div'> & {
  fixed?: boolean;
};

export function DottedSurface({ className, children, fixed = true, ...props }: DottedSurfaceProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        particles: THREE.Points[];
        animationId: number;
        count: number;
    } | null>(null);

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current || !containerRef.current) return;

        const SEPARATION = 100;
        const AMOUNTX = 50;
        const AMOUNTY = 50;

        // Get container dimensions
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            1,
            10000,
        );
        camera.position.set(0, 200, 800);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        canvasRef.current.appendChild(renderer.domElement);

        // Create particles
        const positions: number[] = [];
        const colors: number[] = [];

        // Create geometry for all particles
        const geometry = new THREE.BufferGeometry();

        // Use resolvedTheme for SSR compatibility
        const currentTheme = resolvedTheme || theme || 'light';
        const isDark = currentTheme === 'dark';

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                const y = 0;
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                positions.push(x, y, z);
                if (isDark) {
                    colors.push(0.8, 0.8, 0.8);
                } else {
                    colors.push(0.2, 0.2, 0.2);
                }
            }
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3),
        );
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Create material
        const material = new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
        });

        // Create points object
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let count = 0;
        let animationId = 0;

        // Animation function
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const positionAttribute = geometry.attributes.position;
            const positionArray = positionAttribute.array as Float32Array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const index = i * 3;

                    // Animate Y position with sine waves
                    positionArray[index + 1] =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;

                    i++;
                }
            }

            positionAttribute.needsUpdate = true;
            renderer.render(scene, camera);
            count += 0.1;
        };

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Start animation
        animate();

        // Store references
        sceneRef.current = {
            scene,
            camera,
            renderer,
            particles: [points],
            animationId,
            count,
        };

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId);

                // Clean up Three.js objects
                sceneRef.current.scene.traverse((object) => {
                    if (object instanceof THREE.Points) {
                        object.geometry.dispose();
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material) => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });

                sceneRef.current.renderer.dispose();

                if (canvasRef.current && sceneRef.current.renderer.domElement) {
                    canvasRef.current.removeChild(
                        sceneRef.current.renderer.domElement,
                    );
                }
            }
        };
    }, [theme, resolvedTheme, mounted]);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div
                ref={containerRef}
                className={cn('relative w-full', className)}
                {...props}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={cn('relative h-full w-full overflow-hidden', className)}
            {...props}
        >
            <div
                ref={canvasRef}
                className={cn(
                    "inset-0",
                    fixed ? "fixed" : "absolute"
                )}
                style={{ zIndex: 0 }}
            />
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
