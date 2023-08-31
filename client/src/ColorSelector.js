import React, { useState, useEffect, useRef } from 'react';
import { ChromePicker } from 'react-color';


const ColorSelector = ({onTextColorChange}) => {
  const [color, setColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorSelectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorSelectorRef.current && !colorSelectorRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };
    showColorPicker && document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showColorPicker]);


  const handleColorChange = (newColor) => {
    setColor(newColor);
    onTextColorChange(newColor);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
  <div className=' relative bg-white z-10' ref={colorSelectorRef}>
    <button className=' rounded-full m-3' style={{ backgroundColor: color, height: '30px', width: '30px' }} onClick={toggleColorPicker}></button>
    {showColorPicker &&
    <div className=' absolute right-4 top-4'>
    {/* <button  className=' absolute right-0 z-20 top-0' onClick={toggleColorPicker}><CloseIcon/></button> */}
    <button className='absolute -right-1 z-20 -top-1 rounded-full' style={{ backgroundColor: color, height: '30px', width: '30px' }} onClick={toggleColorPicker}></button>

    <ChromePicker color={color} onChange={(newColor) => handleColorChange(newColor.hex)} /> 
    </div>
    }
  </div>
  );
};

export default ColorSelector;