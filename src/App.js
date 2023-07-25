import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Loader, MeshReflectorMaterial, OrbitControls, OrthographicCamera, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import findPath from './Algorithm'
import { MeshBasicMaterial } from 'three'
import { useSnapshot, proxy } from 'valtio'
import { useDispatch } from 'react-redux'
import { getEnd, getStart } from './redux/slice'
import Ctrld_Hoverboard from './hoverBoard/Ctrld_Hoverboard'
import { City } from './map/City'
import { Hovership } from './mesh/Hovership'





/**
 * FILEPATH: e:\vsCODE projects\PathFinder2\pathfinder\src\App.js
 * This is the main component of the PathFinder2 application. It renders a 3D map and allows the user to select start and end points to find a path between them using the findPath function. The component also updates the color of the path on the map and provides camera controls.
 * @returns {JSX.Element} The App component
 */
export default function App() {

  let end = '';
  let start = '';
  let tmp_route = []

  const dispatch = useDispatch()
  const setSelectedMesh = (mesh) => {

    if (!start) { start = mesh; dispatch(getStart(start)) }
    else if (!end) { end = mesh; dispatch(getEnd(end)) }

    else {
      start = null;
      end = null;
      dispatch(getStart(''));
      dispatch(getEnd(''));

    };


    if (start && end) {
      let route = findPath(start, end)
      console.log(route)

      updatePath(route, false)
      tmp_route = route

    };

    if (end === null) {
      updatePath(tmp_route, true)

      console.log('clr')
    };

  }

  const updatePath = (route, isClear) => {

    if (isClear === false)
      for (let i = 0; i < route.length; i++) {
        setTimeout(() => {
          PathColorState.items[route[i]] = '#3cb371';
        }, i * 100);
      }

    if (isClear) {
      console.log('clr ', route)
      for (let i = 0; i < route.length; i++) {
        setTimeout(() => {
          PathColorState.items[route[i]] = '#f28500';
        }, i * 100);
      }
    }

  }

  function Plane({ position }) {
    
    const ref = useRef();
    return (
      <mesh ref={ref} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#151515"
          metalness={0.6}
          roughness={.9}
        />
      </mesh>
    )
  }


  return (
    <div style={{ width: "100vw", height: "100vh" }}>

      <Canvas gl={{ logarithmicDepthBuffer: true }} camera={{ position: [-15, 10, 18], fov: 12 }}>
        <color attach="background" args={['#17171b']} />
        <ambientLight intensity={0.25} />
        <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]} />
        {/* <City scale={[.2, .3, .2]} position={[-4.2, -1.6, 0]}/> */}
        
        <Hovership position={[1, -1.5, -1.6]} scale={[.16, .16, .16]} />
        <Map scale={[.2, .1, .2]} position={[0, -1.5, 0]} userData={{ excludeShadow: true }} setSelectedMesh={setSelectedMesh} />
        <Ctrld_Hoverboard />
        
        <Plane />

        <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={true} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        {/* <Campos event='mousedown'/>// camerapositionhelper */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur />
        </EffectComposer>
        <Environment background preset='night' blur={0.3} />

      </Canvas>
      <Loader />
    </div>
  )
}



const baseColor = '#f28500';
const PathColorState = proxy({
  current: null,
  items: {
    start: baseColor,
    end: baseColor,
    S1_A_Right: baseColor,
    S1_A_Left: baseColor,
    S1_B: baseColor,
    S1_C: baseColor,
    S1_D: baseColor,
    S2_A: baseColor,
    S2_B: baseColor,
    S2_C_Left: baseColor,
    S2_C_Right: baseColor,
    S2_D: baseColor,
    P1: baseColor,
    P2: baseColor,
    P3: baseColor,
    P4: baseColor,
    L1: baseColor,
    L2: baseColor,
  },
})





const Map = (props) => {
  let baseColor = 'orange'
  const meshRef = useRef();
  const snap = useSnapshot(PathColorState);
  const { nodes, materials } = useGLTF('/map_updated.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.S1_B.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S1_B}
        onClick={() => { props.setSelectedMesh('S1_B') }}
        position={[9.988, 0.064, 1.063]} />

      <mesh geometry={nodes.S1_A_Right.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S1_A_Left}
        onClick={() => props.setSelectedMesh('S1_A_Left')}
        position={[10.003, 0.064, 13.084]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.S1_C.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S1_C}
        onClick={() => props.setSelectedMesh('S1_C')}
        position={[-0.018, 0.064, -0.955]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.S1_D.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S1_D}
        onClick={() => props.setSelectedMesh('S1_D')}
        position={[-0.002, 0.064, 1.069]} />

      <mesh geometry={nodes.P2.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.P2}
        onClick={() => props.setSelectedMesh('P2')}
        position={[-6.048, 0.064, -0.927]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.L2.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.L2}
        onClick={() => props.setSelectedMesh('L2')}
        position={[-6.048, 0.064, -12.937]} />

      <mesh geometry={nodes.P1.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.P1}
        onClick={() => props.setSelectedMesh('P1')}
        position={[16.005, 0.064, -0.945]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.L1.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.L1}
        onClick={() => props.setSelectedMesh('L1')}
        position={[16.005, 0.064, -12.955]} />

      <mesh geometry={nodes.S2_D.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S2_D}
        onClick={() => props.setSelectedMesh('S2_D')}
        position={[-0.018, 0.078, -16.905]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.S2_A.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S2_A}
        onClick={() => props.setSelectedMesh('S2_A')}
        position={[9.988, 0.078, -14.887]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.S2_B.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S2_B}
        onClick={() => props.setSelectedMesh('S2_B')}
        position={[9.973, 0.078, -16.91]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.P3.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.P3}
        onClick={() => props.setSelectedMesh('P3')}
        position={[16.018, 0.078, -14.914]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.P4.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.P4}
        onClick={() => props.setSelectedMesh('P4')}
        position={[-6.035, 0.078, -14.896]} rotation={[0, 1.571, 0]} />

      <mesh geometry={nodes.start.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.start}
        ref={meshRef}
        onClick={() => { props.setSelectedMesh('start'); console.log(meshRef.current.position) }}
        position={[5.031, 0.062, 23.075]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.end.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.end}
        onClick={() => props.setSelectedMesh('end')}
        position={[5.02, 0.064, -29.004]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.S1_A_Left.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S1_A_Right}
        ref={meshRef}
        onClick={() => { props.setSelectedMesh('S1_A_Right'); console.log(meshRef.current.position) }}
        position={[-0.001, 0.064, 13.084]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.S1_C_Right.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S2_C_Left}
        onClick={() => props.setSelectedMesh('S2_C_Left')}
        position={[10.003, 0.064, -28.959]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.S2_C_Left.geometry} material={new MeshBasicMaterial({ color: baseColor })}
        material-color={snap.items.S2_C_Right}
        onClick={() => props.setSelectedMesh('S2_C_Right')}
        position={[-0.001, 0.064, -28.959]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}

useGLTF.preload('/map_updated.glb')