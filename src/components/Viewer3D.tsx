import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Maximize2, RotateCw, Layers, Ruler, Activity, Eye } from "lucide-react";
import { Button } from "./ui/button";

function SeagrassBlade({ position, height = 2, hue = 0.35, phase = 0 }: { position: [number, number, number]; height?: number; hue?: number; phase?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.z = Math.sin(t * 0.7 + position[0] + phase) * 0.18;
      ref.current.rotation.x = Math.cos(t * 0.5 + position[2] + phase) * 0.1;
    }
  });
  // Subsurface-feeling material via emissive + transmission feel
  const color = useMemo(() => new THREE.Color().setHSL(hue, 0.65, 0.38), [hue]);
  const emissive = useMemo(() => new THREE.Color().setHSL(hue, 0.7, 0.12), [hue]);
  return (
    <mesh ref={ref} position={[position[0], height / 2 - 0.5, position[2]]} castShadow>
      <cylinderGeometry args={[0.02, 0.07, height, 10]} />
      <meshPhysicalMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.35}
        roughness={0.5}
        metalness={0.0}
        transmission={0.25}
        thickness={0.4}
        clearcoat={0.6}
        clearcoatRoughness={0.35}
        sheen={0.5}
        sheenColor={new THREE.Color().setHSL(0.45, 0.6, 0.7)}
      />
    </mesh>
  );
}

function Sediment() {
  const refs = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (refs.current) {
      refs.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });
  const points = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 200; i++) {
      pts.push((Math.random() - 0.5) * 8, Math.random() * 4 - 0.5, (Math.random() - 0.5) * 8);
    }
    return new Float32Array(pts);
  }, []);
  return (
    <group ref={refs}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#a8e7ff" transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  );
}

function SeagrassCluster() {
  const blades = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => {
        const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.4;
        const r = 0.2 + Math.random() * 0.85;
        return {
          pos: [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [number, number, number],
          h: 1.4 + Math.random() * 1.6,
          hue: 0.27 + Math.random() * 0.13,
          phase: Math.random() * Math.PI * 2,
        };
      }),
    []
  );
  return (
    <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.35}>
      <group>
        {blades.map((b, i) => (
          <SeagrassBlade key={i} position={b.pos} height={b.h} hue={b.hue} phase={b.phase} />
        ))}
        {/* Sandy substrate */}
        <mesh position={[0, -0.55, 0]} receiveShadow>
          <cylinderGeometry args={[1.4, 1.6, 0.1, 48]} />
          <meshStandardMaterial color="#d8c9a3" roughness={1} metalness={0} />
        </mesh>
        {/* rhizome ring */}
        <mesh position={[0, -0.48, 0]}>
          <torusGeometry args={[0.7, 0.04, 8, 32]} />
          <meshStandardMaterial color="#8a6f4a" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export const Viewer3D = () => {
  return (
    <section id="viewer" className="relative px-6 lg:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div>
            <div className="label-mono text-aqua">/ 02 — Photogrammetry Viewer</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Ultra-realistic 3D specimen
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
              Each model is reconstructed from in-situ photogrammetry. Subsurface scattering, fluid sway and caustic lighting recreate the underwater environment.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span>248K tris</span> · <span>4K PBR</span> · <span className="text-bio">USDZ ready</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* 3D Canvas */}
          <div className="lg:col-span-3 relative aspect-[4/3] w-full rounded-2xl overflow-hidden glass-strong">
            <div className="absolute inset-0 bg-gradient-to-b from-deep-sea via-ocean to-abyss" />
            <div className="absolute inset-0 bg-gradient-glow opacity-70" />
            <div className="absolute inset-0 caustics animate-caustic-shift opacity-60" />

            <Canvas shadows camera={{ position: [3.2, 2.4, 4], fov: 42 }} className="!absolute inset-0">
              <ambientLight intensity={0.35} color="#88ddff" />
              <directionalLight position={[5, 8, 5]} intensity={1.5} color="#bff0ff" castShadow shadow-mapSize={[1024, 1024]} />
              <pointLight position={[-3, 2, -3]} intensity={0.8} color="#5eead4" />
              <pointLight position={[2, 4, -2]} intensity={0.4} color="#a8f0ff" />
              <fog attach="fog" args={["#0a3a4f", 5, 14]} />
              <Suspense fallback={null}>
                <SeagrassCluster />
                <Sediment />
                <ContactShadows position={[0, -0.49, 0]} opacity={0.5} scale={6} blur={2.2} far={3} />
                <Environment preset="sunset" />
              </Suspense>
              <OrbitControls enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.1} />
            </Canvas>

            {/* HUD - Top */}
            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-lg bg-abyss/70 backdrop-blur px-2.5 py-1.5 text-[10px] font-mono text-aqua border border-aqua/25">
              <span className="h-1.5 w-1.5 rounded-full bg-bio animate-pulse" />
              <span className="italic">Enhalus acoroides</span>
              <span className="text-foam/50">·</span>
              <span>SPECIMEN-04</span>
            </div>

            <div className="absolute top-3 right-3 flex flex-col gap-1.5">
              {[Eye, RotateCw, Layers, Maximize2].map((Ic, i) => (
                <button key={i} className="grid h-8 w-8 place-items-center rounded-lg bg-abyss/70 backdrop-blur border border-aqua/20 text-aqua hover:bg-aqua/15 transition-colors">
                  <Ic className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>

            {/* HUD - Bottom: scale + axis */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-abyss/70 backdrop-blur px-2.5 py-1.5 text-[10px] font-mono text-foam/80 border border-foam/15">
              <Ruler className="h-3 w-3 text-aqua" />
              <span>1u = 10cm</span>
              <span className="text-foam/40">|</span>
              <span className="text-aqua">XYZ</span>
            </div>

            <div className="absolute bottom-3 right-3 rounded-lg bg-abyss/70 backdrop-blur px-2.5 py-1.5 text-[10px] font-mono text-aqua border border-aqua/20 flex items-center gap-2">
              <Activity className="h-3 w-3" />
              60 FPS · WebGL2
            </div>

            {/* Holographic frame corners */}
            <span className="pointer-events-none absolute top-0 left-0 h-10 w-10 border-l border-t border-aqua/40" />
            <span className="pointer-events-none absolute top-0 right-0 h-10 w-10 border-r border-t border-aqua/40" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-l border-b border-aqua/40" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-r border-b border-aqua/40" />
          </div>

          {/* Side: spec sheet */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-strong rounded-2xl p-5">
              <div className="label-mono">Specimen Data</div>
              <h3 className="mt-1 font-display text-xl font-bold italic">Enhalus acoroides</h3>
              <p className="text-xs text-muted-foreground">Tape Seagrass · Hydrocharitaceae</p>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                {[
                  { l: "Blade length", v: "30–150 cm" },
                  { l: "Blade width", v: "13–17 mm" },
                  { l: "Depth range", v: "0.5–4 m" },
                  { l: "Substrate", v: "Sandy mud" },
                  { l: "Flowering", v: "Year-round" },
                  { l: "Carbon seq.", v: "1.2 kg/m²/yr" },
                ].map((d) => (
                  <div key={d.l} className="rounded-lg border border-border bg-secondary/30 p-2.5">
                    <dt className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{d.l}</dt>
                    <dd className="mt-1 font-mono text-foam">{d.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="label-mono">Render Layers</div>
                <span className="text-[10px] font-mono text-bio">4 / 4 ACTIVE</span>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { l: "Albedo + Normal", v: 100 },
                  { l: "Subsurface scatter", v: 86 },
                  { l: "Fluid simulation", v: 72 },
                  { l: "Caustic projection", v: 64 },
                ].map((r) => (
                  <div key={r.l}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{r.l}</span>
                      <span className="font-mono text-aqua">{r.v}%</span>
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-gradient-aqua" style={{ width: `${r.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Button variant="hero" size="sm" className="flex-1">Open AR</Button>
                <Button variant="glass" size="sm">Download .glb</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
