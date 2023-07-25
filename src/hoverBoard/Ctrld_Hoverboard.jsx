/**
 * This component is a controlled version of the HoverBoard component. It uses the useControls hook to get the user's input and updates the position and rotation of the HoverBoard mesh accordingly. It also uses the useSpring hook from react-spring to animate the rotation and the forward/backward lean of the HoverBoard mesh. 
 * @returns JSX.Element
 */
import React, { useRef, useState } from 'react'
import { useControls } from '../utils/useControls'
import { HoverBoard } from '../mesh/AnimatedMan';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three'
import { Float } from '@react-three/drei';

//this component is the same as the hoverboard component but it is controlled by the user



function Ctrld_Hoverboard() {
  const controls = useControls()
  const ref = useRef();

  const [rotation, setRotation] = useState(Math.PI);
  const [FwdBwdLean, setFwdBwdLean] = useState(0);

  const springProps = useSpring({
    rotation: rotation,
    config: { duration: 500 },
  });

  const LeanAnim = useSpring({
    Lean: FwdBwdLean,
    config: { duration: 300 },
  });


  useFrame((_, delta) => {
    const { forward, backward, left, right } = controls.current;

    if (left && !forward && !backward) {
      ref.current.position.x -= .8 * delta;
      setRotation(-Math.PI / 2);
    }

    if (right && !forward && !backward) {
      ref.current.position.x += .8 * delta;
      setRotation(Math.PI / 2);

    }

    if (forward && !left && !right) {
      setRotation(Math.PI);
      setFwdBwdLean(-0.2);
      ref.current.position.z -= .8 * delta;
    };

    if (backward && !left && !right) {
      setRotation(0);
      setFwdBwdLean(0.2);
      ref.current.position.z += .8 * delta;
    };

    if (!forward && !backward) {
      setFwdBwdLean(0);
    };
  });



  return (
    <Float ref={ref} speed={4} floatIntensity={0.2}>

      <animated.mesh rotation-y={springProps.rotation} rotation-x={LeanAnim.Lean}>
        <HoverBoard scale={[.2, .2, .2]} position={[0, -1.465, 0]} />
      </animated.mesh>

    </Float>
  )
}

export default Ctrld_Hoverboard;