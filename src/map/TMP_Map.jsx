/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 map.glb
*/

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useSnapshot,proxy } from 'valtio'
import findPath from '../Algorithm'
import { useFrame } from '@react-three/fiber'
import { clear_path } from '../redux/slice'
import { useSelector } from 'react-redux'


export const Map = React.memo((props) => {
  const { nodes, materials } = useGLTF('/map.glb')
  const isClear = useSelector((state)=>state.state.value_of_clr_button)
  // const [route, setRoute] = useState([])
  const ref = useRef()
  
  const baseColor = 'white'

  
  const state = proxy({
    current: null,
    items: {
      S1_A: 'orange',
      S1_B: 'orange',
      S1_C: 'orange',
      S1_D: 'orange',
      S2_A: 'orange',
      S2_B: 'orange',
      S2_C: 'orange',
      S2_D: 'orange',
      P1: 'orange',
      P2: 'orange',
      P3: 'orange',
      P4: 'orange',
      L1: 'orange',
      L2: 'orange',
    },
  })
  const snap = useSnapshot(state)

  const handleMeshClick = (meshName) => {
    
    const selectedColor = 'blue';

    if (!state.start) {
      state.start = meshName;
      console.log('start ', state.start)
    } else if (!state.end) {
      state.end = meshName;
      console.log('end ', state.end)
      //findShortestPath();
    } else {
      state.start = meshName;
      state.end = null;
    }

    // if (state.start && state.end) {
     
    //   let route = findPath(state.start, state.end)
    //   // state.items[snap.current] = 
    //   // route.map((item) => state.items[item] = 'blue')
    //   console.log(route)
    // // if(route)
    // //   for(let i =0;i<route.length;i++){
    // //     state.items[route[i]]='blue';
    // //   }
    // }
    
    
  };
 
    if (isClear) {
      state.start = null;
      state.end = null;
      console.log("clr");
      
    }


  


  return (

    <group {...props} dispose={null}>

      <mesh geometry={nodes.S1_B.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S1_B}
        onClick={() => handleMeshClick('S1_B')}

        position={[9.988, 0.064, 1.063]} />

      <mesh geometry={nodes.S1_A.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S1_A}
        onClick={() => handleMeshClick('S1_A')}
        position={[-0.001, 0.064, 13.084]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.S1_C.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S1_C}
        onClick={() => handleMeshClick('S1_C')}
        position={[-0.018, 0.064, -0.955]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.S1_D.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S1_D}
        onClick={() => handleMeshClick('S1_D')}
        position={[-0.002, 0.064, 1.069]} />

      <mesh geometry={nodes.P2.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.P2}
        onClick={() => handleMeshClick('P2')}
        position={[-6.048, 0.064, -0.927]} rotation={[0, Math.PI / 2, 0]} />

      <mesh geometry={nodes.L2.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.L2}
        onClick={() => handleMeshClick('L2')}
        position={[-6.048, 0.064, -12.937]} />

      <mesh geometry={nodes.P1.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.P1}
        onClick={() => handleMeshClick('P1')}
        position={[16.005, 0.064, -0.945]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.L1.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.L1}
        onClick={() => handleMeshClick('L1')}
        position={[16.005, 0.064, -12.955]} />

      <mesh geometry={nodes.S2_D.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S2_D}
        onClick={() => handleMeshClick('S2_D')}
        position={[-0.018, 0.078, -16.905]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.S2_C.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S2_C}
        onClick={() => handleMeshClick('S2_C')}
        position={[9.972, 0.078, -28.925]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.S2_A.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S2_A}
        onClick={() => handleMeshClick('S2_A')}
        position={[9.988, 0.078, -14.887]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.S2_B.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.S2_B}
        onClick={() => handleMeshClick('S2_B')}
        position={[9.973, 0.078, -16.91]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.P3.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.P3}
        onClick={() => handleMeshClick('P3')}
        position={[16.018, 0.078, -14.914]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh geometry={nodes.P4.geometry} material={new MeshBasicMaterial({ color: baseColor })} material-color={snap.items.P4}
        onClick={() => handleMeshClick('P4')}
        position={[-6.035, 0.078, -14.896]} rotation={[0, 1.571, 0]} />

      <mesh geometry={nodes.start.geometry} material={new MeshBasicMaterial({ color: 'green' })} material-color={snap.items.start}
        onClick={() => handleMeshClick('start')}
        position={[-0.001, 0.064, 25.126]} rotation={[Math.PI, 0, Math.PI]} />

      <mesh geometry={nodes.end.geometry} material={new MeshBasicMaterial({ color: 'red' })} material-color={snap.items.end}
        onClick={() => handleMeshClick('end')}
        position={[9.955, 0.064, -30.96]} rotation={[Math.PI, 0, Math.PI]} />

    </group>

  )
});

useGLTF.preload('/map.glb')