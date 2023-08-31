import React, { useState , useEffect} from 'react';
import { Select } from '@chakra-ui/react'
import Message from './Message';


const HomePage = () => {
  const [topic, setTopic] = useState(null);
  const handleSelectTopic = (evt) => {
      setTopic(evt.target.value);
  }

  return (
    <div>

      <Select className='text-2xl font-bold' placeholder='What are you celebrating?' variant="flushed" name="topic" size='lg'
      onChange={handleSelectTopic}>
        <option value='anniversary'>Anniversary</option>
        <option value='birthday'>Birthday</option>
        <option value='mothers_day'>Mother's Day</option>
        <option value='Wedding'>Wedding</option>
      </Select>

      

      <div className='my-5' >
        {(topic && 
        <Message topic={topic}/>
        )}
      </div>

    </div>
  );
}

export default HomePage;