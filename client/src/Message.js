import { Textarea } from '@chakra-ui/react';
import React, {useState, useEffect, useRef} from 'react';
import { ChevronRightIcon, RepeatIcon, RepeatClockIcon} from '@chakra-ui/icons'

import CardTemplate from './CardTemplate';
import FontSelector from './FontSelector';
import ColorSelector from './ColorSelector';

const Message = ({topic}) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState([]);
  const [messageReload, setMessageReload] = useState(false);
  const [messageTextColor, setMessageTextColor] = useState('#000000');
  const [selectedFont, setSelectedFont] = useState('');
  const [undoStack, setUndoStack] = useState([]);

  const messageRef = useRef(null);
  
  const getData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const apiURL = "http://localhost:3030/" + topic;
    await fetch(apiURL, requestOptions)
      .then(response => response.json())
      .then(data => {
        setMessageList(data);
      })
      .catch(error => console.error(error));
  }

  const getNextMessage = () => {
    setMessageReload(!messageReload);
  }

  const handleSelectedFont = (newFont) => {
    setSelectedFont(newFont);
  }
  const handleMessageChange = (evt) => {
    setMessage(evt.target.value);
  }

  const handleMessageTextColorChange = (newData) => {
    setMessageTextColor(newData);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousValue = undoStack.pop();
      setMessage(previousValue);
      setUndoStack(undoStack);
      messageRef.current.value = previousValue;
    }
  }

  useEffect(() => {
    getData();
  }, [topic]);

  useEffect(() => {
    // select random message from array
    const randomIndex = Math.floor(Math.random() * messageList.length);
    const randomMessage = messageList[randomIndex];
    setMessage(randomMessage);
    setUndoStack([...undoStack, randomMessage]);
    messageRef.current.value = randomMessage;
  }, [messageList,messageReload]);


  return (
    <>
    <CardTemplate message={message} textColor={messageTextColor} fontStyle={selectedFont}/>
    <div className='flex gap-2 lg:gap-5'>

    {/* <div className='flex flex-col justify-center p-3'><button  onClick={getNextMessage}><RepeatIcon boxSize="6" className='hover:animate-spin'/></button></div> */}
    <button onClick={handleUndo}><RepeatClockIcon/> Undo</button>
    <div className='p-1 w-full flex flex-col justify-center'><button className='rounded outline-dashed p-2 font-bold text-md'  onClick={getNextMessage}><RepeatIcon/> New Message</button></div>
    <FontSelector className="w-full" selectedFontCallback={handleSelectedFont} />
    <ColorSelector className={'w-full'} onTextColorChange={handleMessageTextColorChange}/>
    </div>
    <div className='flex mt-5' >
      <Textarea ref={messageRef} variant="outline" size='lg' className=' min-h-max' placeholder={message} defaultValue={message} onChange={handleMessageChange} ></Textarea>
    </div>
    <div className='flex justify-start'>
      <div className='p-3 text-lg font-semibold'><a href='/kudos'>Send Kudos <ChevronRightIcon boxSize="4" /></a></div>
    </div>
    </>
  );
}

export default Message;
