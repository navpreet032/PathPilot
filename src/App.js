import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {  OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import {Map} from './map/Map2'
import Campos from './camerapositionhelper'
import Overlay from './overlay'






export default function App() {
 


  function Box(props) {
    const mesh = useRef();
    return (
       <mesh {...props} ref={mesh}>
          <boxGeometry args={[.1,.1,.1]} />
          <meshStandardMaterial color={"Blue"} />
       </mesh>
    );
 }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Overlay/>
    <Canvas gl={{ logarithmicDepthBuffer: true }}  camera={{ position: [14.32,0,10.95], fov: 25 ,rotation:[63,0,46]}}>
      <fog attach="fog" args={['black', 15, 21.5]} />
    
        //X 0.5 = right , 0 = center, -.5 = left
        //Y 0.5 = towardsStart , -.5 = towardsEnd
        <ambientLight intensity={0.5} />
        <Box position={[.0,.075,.8]} />   
        <Map scale={[.1,.3,.1]} position={[0,0,0]}  userData={{ excludeShadow: true }} />
      
      
      <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom={true} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      {/* <Campos event='mousedown'/>// camerapositionhelper */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur />
      </EffectComposer>
      {/* <Environment background preset="sunset" blur={0.8} /> */}
    </Canvas>
    </div>
  )
}

