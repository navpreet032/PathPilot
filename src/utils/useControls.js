import { useEffect, useRef } from 'react'
/**
 * This hook is used to detect key press
 * @param {Array} target - array of keys to be detected
 * @param {Function} event - function to be called when key is pressed
 * useControls() is used to detect key press
 * useControls() returns an object with keys forward, backward, left, right
 * useKeyPress() is used to detect key press
 * @returns jsx element
 */
export function useKeyPress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
}

export function useControls() {
  const keys = useRef({ forward: false, backward: false, left: false, right: false,  })
  // by using useRef we can avoide infinite loop error . if we use useState error can be caused 
  useKeyPress(['ArrowUp', 'w'], (pressed) => (keys.current.forward = pressed))
  useKeyPress(['ArrowDown', 's'], (pressed) => (keys.current.backward = pressed))
  useKeyPress(['ArrowLeft', 'a'], (pressed) => (keys.current.left = pressed))
  useKeyPress(['ArrowRight', 'd'], (pressed) => (keys.current.right = pressed))
  
  return keys
}
