import React,{ useState } from 'react'
import "../styles/home.scss";
import useAsync from '../message-control/renderer';


export default function Home() {

  const { sendAsync } = useAsync()
  const [message,setMessage] = useState('');
  const [response,setResponse] = useState();

  function send(data) {
    sendAsync(data).then((result) => setResponse(result));
  }

  return (
    <article>
    <h2>Stock</h2>
      <p>
        Say <i>ping</i> to the main process.
          </p>
      <input
        type="text"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <button type="button" onClick={() => send(message)}>
        Send
          </button>
      <br />
      <p>Main process response:</p>
      <br />
      <pre>
        {JSON.stringify(response)}
      </pre>
    </article>
  );
}
