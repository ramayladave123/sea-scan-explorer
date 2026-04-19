import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { Maximize2, RotateCw, Layers } from "lucide-react";
import { Button } from "./ui/button";

function SeagrassBlade({ position, height = 2, hue = 0.35 }: { position: [number, number, number]; height?: number; hue?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.z = Math.sin(t * 0.8 + position[0]) * 0.15;
      ref.current.rotation.x = Math.cos(t * 0.6 + position[2]) * 0.08;
    }
  });
  const color = new THREE.Color().setHSL(hue, 0.6, 0.4);
  return (
    <mesh ref={ref} position={[position[0], height / 2 - 0.5, position[2]]}>
      <cylinderGeometry args={[0.04, 0.08, height, 8]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

function SeagrassCluster() {
  const blades = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const r = 0.3 + Math.random() * 0.6;
    return {
      pos: [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [number, number, number],
      h: 1.6 + Math.random() * 1.4,
      hue: 0.28 + Math.random() * 0.12,
    };
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {blades.map((b, i) => (
          <SeagrassBlade key={i} position={b.pos} height={b.h} hue={b.hue} />
        ))}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.1, 32]} />
          <meshStandardMaterial color="#1a3a4a" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export const Viewer3D = () => {
  return (
    <section id="viewer" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">/ 02 — Interactive 3D</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Walk through the meadow.
              <span className="block text-gradient">Without getting wet.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Rotate, zoom and inspect every blade. Each species is reconstructed from real photogrammetry of Mati City reefs — accurate down to the rhizome.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: RotateCw, label: "360° Rotation", desc: "Drag to orbit, scroll to zoom" },
                { icon: Layers, label: "Anatomical Layers", desc: "Inspect leaves, sheath, and roots" },
                { icon: Maximize2, label: "AR Projection", desc: "Place at real-world scale on mobile" },
              ].map((f) => (
                <li key={f.label} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display font-semibold">{f.label}</div>
                    <div className="text-sm text-muted-foreground">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              <Button variant="hero">Open AR Mode</Button>
              <Button variant="outline">Download model</Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass shadow-deep">
            <div className="absolute inset-0 bg-gradient-to-b from-deep-sea via-ocean to-teal/40" />
            <div className="absolute inset-0 bg-gradient-glow opacity-60" />
            <Canvas camera={{ position: [3, 2.5, 4], fov: 45 }} className="!absolute inset-0">
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 8, 5]} intensity={1.2} color="#7fdbff" />
              <pointLight position={[-3, 2, -3]} intensity={0.6} color="#5eead4" />
              <Suspense fallback={null}>
                <SeagrassCluster />
                <Environment preset="sunset" />
              </Suspense>
              <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.6} />
            </Canvas>

            {/* HUD */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-abyss/60 backdrop-blur px-3 py-1.5 text-xs font-mono text-aqua border border-aqua/30">
              <span className="h-1.5 w-1.5 rounded-full bg-bio animate-pulse-glow" />
              LIVE · Enhalus acoroides
            </div>
            <div className="absolute bottom-4 right-4 rounded-xl bg-abyss/60 backdrop-blur px-3 py-2 text-[10px] font-mono text-foam/80 border border-foam/20">
              DRAG · ZOOM · EXPLORE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
