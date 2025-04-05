import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ isUserInteracting }) => {
  const gltf = useGLTF("/model/futuristic_flying_animated_robot_-_low_poly.glb");
  const modelRef = useRef();

  // Auto-rotate only when the user is not interacting
  useFrame(() => {
    if (modelRef.current && !isUserInteracting.current) {
      modelRef.current.rotation.y += 0.005; // Smooth auto-rotate
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={2.5}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const ModelViewer = () => {
  const isUserInteracting = useRef(false);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <Model isUserInteracting={isUserInteracting} />
        </Suspense>

        {/* OrbitControls now allow user interaction and update ref status */}
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          onStart={() => (isUserInteracting.current = true)}
          onEnd={() => (isUserInteracting.current = false)}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
