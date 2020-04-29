import * as THREE from "three";
import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  createElement,
} from "react";
import {
  Canvas,
  useThree,
  useFrame,
  useLoader,
  extend,
} from "react-three-fiber";
import { useTransition, a } from "react-spring";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import virus from "../virus5.gltf";
import api from "../api";

extend({ OrbitControls });
const Controls = (props) => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

function Model(props) {
  const group = useRef();
  const model = useLoader(GLTFLoader, virus, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.decoderPath = "/draco-gltf/";
    loader.setDRACOLoader(dracoLoader);
  });

  const actions = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useFrame((state, delta) => {
    group.current.rotation.x = group.current.rotation.y +=
      Math.random() * 0.002;
    if (group.current.scale.x < 1) {
      group.current.scale.x += 0.001;
      group.current.scale.y += 0.001;
      group.current.scale.z += 0.001;
    }
    mixer.update(delta);
  });
  useEffect(() => {
    const root = group.current;

    actions.current = {
      storkFly_B_: mixer.clipAction(model.animations[0], root),
    };
    return () => model.animations.forEach((clip) => mixer.uncacheClip(clip));
  });
  useEffect(() => void actions.current.storkFly_B_.play(), []);

  return (
    <group ref={group} {...props}>
      <mesh
        castShadow
        receiveShadow
        name="Icosphere001"
        morphTargetDictionary={model.__$[3].morphTargetDictionary}
        morphTargetInfluences={model.__$[3].morphTargetInfluences}
      >
        <bufferGeometry attach="geometry" {...model.__$[3].geometry} />
        <meshStandardMaterial
          attach="material"
          {...model.__$[3].material}
          roughness={1}
        />
      </mesh>
    </group>
  );
}

function Models() {
  const vir = useRef();
  const [news, setNews] = useState(null);
  const [cnt, setCnt] = useState(null);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    api((result) => {
      setCnt(result.totalResults);
      setNews(result.articles);
    });
  }, []);

  return (
    news !== null &&
    new Array(cnt).fill().map((_, i) => {
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() * 10 - 5;
      return (
        <Model
          key={i}
          position={[x, y, z]}
          onPointerOver={(e) => console.log(e, i)}
        />
      );
    })
  );
}

function Loading() {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true);
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200);
  }, []);

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      )
  );
}

export default function Home() {
  return (
    <>
      <div className="bg" />

      <Canvas camera={{ position: [0, 0, 30] }} shadowMap>
        <ambientLight intensity={4} />
        <pointLight intensity={2} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={0.5}
          angle={Math.PI / 8}
          position={[25, 25, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {console.log("hi")}

        <Suspense fallback={null}>
          <Models />
        </Suspense>

        <Controls
          enablePan={true}
          enableZoom={true}
          enableDamping
          dampingFactor={0.5}
        />
      </Canvas>

      <Loading />
      <a
        href="https://github.com/drcmda/learnwithjason"
        className="top-left"
        children="Github"
      />
      <a
        href="https://twitter.com/0xca0a"
        className="top-right"
        children="Twitter"
      />
      <a
        href="https://github.com/drcmda/react-three-fiber"
        className="bottom-left"
        children="+ react-three-fiber"
      />
    </>
  );
}
