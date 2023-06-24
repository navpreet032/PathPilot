import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Campos({event} ={}){
    const {camera} = useThree();
    const cameraRef = useRef();

    useEffect(()=>{
        const logCamPos=()=>{
            const {x, y, z} = cameraRef.current.position;

            const roundedX = Math.round(x*100)/100;
            const roundedY = Math.round(y*100)/100;
            const roundedZ = Math.round(z*100)/100;

            console.log(`Camera Pos : ${roundedX},${roundedY},${roundedZ}`)
        }

        cameraRef.current = camera;

        window.addEventListener(event, logCamPos);

        return ()=>{
          window.removeEventListener(event,logCamPos);  
        }
    },[])
    return null;
}
export default Campos;
