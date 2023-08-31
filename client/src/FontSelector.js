import React, { useState } from 'react';
import { Select } from '@chakra-ui/react'


const FontSelector = ({selectedFontCallback}) => {
  const [selectedFont, setSelectedFont] = useState('');

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
    selectedFontCallback(event.target.value);
  };

  return (
    <div className='w-full'>
      <Select className='text-2xl font-bold' placeholder='Style' variant="flushed" name="font-selector" size='lg' value={selectedFont} onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Arial Black">Arial Black</option>
        <option value="Courier">Courier</option>
        <option value="Georgia">Georgia</option>
        <option value="Gill Sans">Gill Sans</option>
        <option value="Impact">Impact</option>
        <option value="Palatino">Palatino</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Trebuchet">Trebuchet</option>
        <option value="Verdana">Verdana</option>
        {/* Add more font options as needed */}
      </Select>
      {/* <p style={{ fontFamily: selectedFont }} className="selected-font">{selectedFont ? 'Sample Text' : ''}</p> */}
    </div>
  );
};

export default FontSelector;