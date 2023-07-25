/**
 * This component renders an overlay that displays a message based on the start and end points selected by the user.
 * It also renders a help box with instructions on how to use the application.
 * @returns {JSX.Element} Overlay component
 */
import React, { useEffect, useRef, useState } from 'react';
import './overlay.css';
// import { getEnd, getStart } from './redux/slice';
import { useSelector } from 'react-redux';

function Overlay() {
    
    const start = useSelector(state => state.state.start_value);
    const end = useSelector(state => state.state.end_value);
    
    const [message, setMessage] = useState('');
    const [showHelpBox, setShowHelpBox] = useState(true);
    const helpBoxRef = useRef ();

    console.log("start ", start, "end ", end);
    useEffect(()=>{
        
        if(start && !end) {setMessage('start selected!');}
        if(start && end) {setMessage('end selected!');setTimeout(() => setMessage('Shortest path found'), 1000);}
        if(!start && !end){setMessage('Nothing selected!'); }
        
        
        console.log("start and end ", start, end)
    },[start,end])

    useEffect(() => {
      // Event listener to handle clicks outside the helpBox
      const handleClickOutside = (event) => {
        if (helpBoxRef.current && !helpBoxRef.current.contains(event.target)) {
          setShowHelpBox(false);
        }
      };
  
      // Add the event listener when the component mounts
      document.addEventListener('click', handleClickOutside);
  
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    const toggleHelpBox = () => {
      setShowHelpBox(!showHelpBox);
    };
    
  return (
    <div className='container'>
        <div className='box'>
            
        <h4>{message} </h4>
        </div>
        {showHelpBox&&
        <div className='helpbox' ref={helpBoxRef} onClick={toggleHelpBox}>
            <h4>How to use:</h4>
            <p>1. Select a start point</p>
            <p>2. Select an end point</p>
            <p>3. To clear the path <b>click on any path</b></p>
            <p>4. Use <b>W S A D</b> to control the HoverBoard</p>

        </div>
}
        
    </div>
  )
}

export default Overlay;