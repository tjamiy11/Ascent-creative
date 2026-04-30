"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

/**
 * GlassObject — a slow-rotating refractive icosahedron.
 *
 * The visual concept: one solid form rendered as dispersive glass under a
 * soft studio HDRI. The faceted geometry produces the rainbow-leaning
 * refraction patterns that read as "caustics" inside the form itself,
 * without needing offline photon-mapped caustics on a floor plane.
 *
 * `paused` short-circuits the per-frame rotation when the user has set
 * prefers-reduced-motion. The Float wrapper still shows the form, but it
 * stops drifting too.
 */
function GlassObject({ paused }: { paused: boolean }) {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (paused || !mesh.current) return;
    mesh.current.rotation.x += delta * 0.06;
    mesh.current.rotation.y += delta * 0.09;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.25, 1]} />
      <MeshTransmissionMaterial
        samples={6}
        resolution={512}
        transmission={1}
        thickness={0.55}
        roughness={0.06}
        ior={1.5}
        chromaticAberration={0.4}
        anisotropy={0.1}
        distortion={0.15}
        distortionScale={0.5}
        temporalDistortion={0.05}
      />
    </mesh>
  );
}

export function HeroVisual() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 32 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      aria-hidden
    >
      {/* Match the page's paper white so transmission samples a clean
          backdrop and reads as glass, not obsidian. */}
      <color attach="background" args={["#ffffff"]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} />
      <directionalLight position={[0, -4, 2]} intensity={0.8} color="#fff5e6" />

      <Suspense fallback={null}>
        {reduced ? (
          <GlassObject paused />
        ) : (
          <Float floatIntensity={0.35} rotationIntensity={0.15} speed={0.7}>
            <GlassObject paused={false} />
          </Float>
        )}
        <Environment preset="studio" background={false} />
      </Suspense>
    </Canvas>
  );
}
