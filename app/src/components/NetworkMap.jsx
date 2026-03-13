import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";

const cities = [
  [0, 0, 0],
  [2, 1, -1],
  [-2, -1, 1],
  [1, -2, 0],
];

function CityNodes() {
  return cities.map((pos, i) => (
    <mesh key={i} position={pos}>
      <sphereGeometry args={[0.07, 32, 32]} />
      <meshBasicMaterial color="#00ffff" />
    </mesh>
  ));
}

function NetworkLines() {
  return (
    <>
      <Line
        points={[
          [0, 0, 0],
          [2, 1, -1],
        ]}
        color="#00ffff"
        lineWidth={2}
      />
      <Line
        points={[
          [0, 0, 0],
          [-2, -1, 1],
        ]}
        color="#00ffff"
        lineWidth={2}
      />
    </>
  );
}

export default function NetworkMap() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <CityNodes />
      <NetworkLines />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}