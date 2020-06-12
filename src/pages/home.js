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
  display: ${(props) =>
    props.id === props.hovered && props.hovered !== null ? "block" : "none"};
  opacity: 70%;
  transition: opacity 2s linear;
  width: 500px;
  border: 1px solid #b57373;
  color: #b57373;
  align-items: center;
  text-align: center;
  h1 {
    color: inherit;
    font-size: 1.2rem;
  }
  img {
    max-width: 400px;
    overflow: clip;
    margin: 0px auto;
  }
`;

const Backword = styled.div`
  display: ${(props) =>
    props.id === props.hovered && props.hovered !== null ? "none" : "block"};
  opacity: 80%;
  position: absolute;
  transition: opacity 2s linear;
  width: 100vw;
  height: 100vh;
  color: #b57373;
  align-items: center;
  text-align: center;
  h1 {
    color: inherit;
    font-size: 2rem;
  }
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
  useEffect(() => void actions.current.storkFly_B_.play());

  return (
    <group
      ref={group}
      {...props}
      onClick={(e) => window.open(`${data.url}`, "_blank")}
    >
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
          <h1>{data.title}</h1>
          <img src={data.urlToImage} alt="" />
          <p>{data.description}</p>
          <p>{data.content}</p>
          <p>written by {data.author}</p>
          <p>{data.publishedAt}</p>
          <p>{data.source.name}</p>
          <h1>Click!</h1>
        </StyledDiv>
      </HTML>
    </group>
  );
}

function Models({ cnt, news, align }) {
  const [springs, set] = useSprings(cnt, (index) => ({
    from: {
      position: [
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
      ],
    },
  }));
  const [hovered, setHover] = useState(null);

  const hoveraction = (e, i) => {
    //console.log(e.type);
    e.type === "pointerover" ? setHover(i) : setHover(null);
  };
  const alignment = () => {
    void set((index) => ({
      position: [
        (index % 5) * 10 - 20,
        -(Math.floor(index / 5) % 5) * 10 + 20,
        Math.floor(index / 25) * 10 - 20,
      ],
      delay: 50, //index * 500
    }));
  };

  align && alignment();

  return (
    news !== null &&
    cnt &&
    news.map((data, i) => {
      return (
        <a.group
          key={i}
          onPointerOver={(e) => hoveraction(e, i)}
          onPointerOut={(e) => hoveraction(e, i)}
          position={springs[i].position}
        >
          <Model
            key={i}
            id={i}
            onClick={alignment}
            hovered={hovered}
            data={data}
          />
        </a.group>
      );
    })
  );
}

export default function Home() {
  const [cnt, setcnt] = useState(0);
  const [news, setNews] = useState(null);
  const [total, setTotal] = useState(null);
  const [align, setAlign] = useState(null);

  useEffect(() => {
    api((result) => {
      setNews(result.articles);
      setTotal(result.totalResults);
      if (result.totalResults >= 100) {
        setcnt(100);
      } else {
        setcnt(result.totalResults);
      }
    });
  }, []);
  return (
    <>
      <div className="bg" />
      <div
        style={{
          display: "inline",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: "0vh",
          left: "0vh",
          fontSize: "7rem",
          color: "white",
          opacity: "50%",
          padding: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "right",
            width: "98vw",
            marginRight: "10px",
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          NEW CASES TODAY <br />
          {total}
        </h1>
      </div>
      <Canvas camera={{ position: [0, 0, 30] }} shadowMap>
        <ambientLight intensity={4} />
        <pointLight intensity={1} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={0.5}
          angle={Math.PI / 8}
          position={[25, 25, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Suspense fallback={null}>
          <Models cnt={cnt} news={news} align={align} />
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
        className="bottom-right"
        children={`today total : ${total}`}
      />
      <a
        href="https://github.com/drcmda/learnwithjason"
        className="top-left"
        children="Github"
        onClick={() => setAlign(true)}
      />
      <a
        href="https://twitter.com/0xca0a"
        className="top-right"
        children="Twitter"
        onClick={() => setAlign(false)}
      />
      <a
        href="https://github.com/drcmda/react-three-fiber"
        className="bottom-left"
        children="+ react-three-fiber"
      />
    </>
  );
}
