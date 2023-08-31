import React, {useState, useEffect} from 'react';

const MessagePage = ([topic]) => {

  const [message, setData] = useState([]);

  const getData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const apiURL = "http://localhost:3030/messages";
    await fetch(apiURL, requestOptions)
      .then(response => response.json())
      .then(data => {
        // select random message from array
        const randomIndex = Math.floor(Math.random() * data.length);
        setData(data[randomIndex])
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify( {
    //       prompt: "",
    //     } )
    // }
    getData();

  }, []);

  
  return (
    <div>
     <h2 className='text-2xl font-bold'>{topic}</h2>
      <div>Message: {message}</div>
    </div>
  );
}

export default MessagePage;


/*
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {

    // POST request using fetch inside useEffect React hook
    const apiKey = ''; 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify( {  
          "model":"text-davinci-002",
          "prompt":"Albert Einstein was"
      },)
    };

    const apiURL = "https://api.openai.com/v1/chat/completions";
    fetch(apiURL, requestOptions)
      .then(response => response.json())
      .then(data => setData(data.choices[0].text.trim()))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Fetch API Data</h1>
      {data}
    </div>
  );

}
*/