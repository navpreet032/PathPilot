import React, { useCallback, useState } from 'react'
import { clear_path } from './redux/slice'
import { useDispatch } from 'react-redux'

export default function Overlay() {

    const [Clear, setClear] = useState(false)
    const dispatch = useDispatch()

    const handleClearButtonClick = (event) => {
        event.preventDefault();
        const newClear = !Clear;
        setClear(newClear);
        dispatch(clear_path(newClear));
      };
      const toggle = useCallback(() => {
        setClear(Clear === true ? false: true);
        dispatch(clear_path(Clear));
      }, [Clear, setClear]);
  return (
    <div>
        <button onClick={toggle}>
        Clear</button>
    </div>
  )
}
