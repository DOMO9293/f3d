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
import { useSprings, a } from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import virus from "../virus5.gltf";
import api from "../api";
import { HTML } from "drei";
import styled from "styled-components";

extend({ OrbitControls });

const Controls = (props) => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

const StyledDiv = styled.div`
  opacity: ${(props) =>
    props.id === props.hovered && props.hovered !== null ? 1 : 0};
  transition: opacity 0.3s linear;
  width: 500px;
`;

function Model({ id, hovered, data, ...props }) {
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
      <HTML>
        <StyledDiv className="content" hovered={hovered} id={id}>
          {data.title} <br />
          ms
        </StyledDiv>
      </HTML>
    </group>
  );
}

function Models() {
  const [springs, set] = useSprings(50, (index) => ({
    from: {
      position: [
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
      ],
    },
  }));

  const [news, setNews] = useState(null);
  const [hovered, setHover] = useState(null);

  const hoveraction = (e, i) => {
    //console.log(e.type);
    e.type === "pointerover" ? setHover(i) : setHover(null);
  };
  const alignment = () => {
    void set((index) => ({
      position: [
        (index % 5) * 20 - 40,
        -(Math.floor(index / 5) % 5) * 20 + 40,
        Math.floor(index / 25) * 10 - 20,
      ],
      delay: 50, //index * 500
    }));
  };
  useEffect(() => {
    api((result) => {
      setNews(result.articles);
    });
  }, []);
  useEffect(() => {}, [news]);

  return (
    news !== null &&
    news.map((data, i) => {
      return (
        <a.group key={i} position={springs[i].position}>
          <Model
            key={i}
            id={i}
            onPointerOver={(e) => hoveraction(e, i)}
            onPointerOut={(e) => hoveraction(e, i)}
            onClick={alignment}
            hovered={hovered}
            data={data}
          />
        </a.group>
      );
    })
  );
}
/* 
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
} */

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

        <Suspense fallback={null}>
          <Models />
        </Suspense>

        <Controls
          enablePan={false}
          enableZoom={true}
          enableDamping
          dampingFactor={0.5}
        />
      </Canvas>

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
