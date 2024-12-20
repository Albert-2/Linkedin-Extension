import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  const triggerAutomation = () => {
    chrome.runtime.sendMessage({ type: 'runAutomation' }, (response) => {
      if (response?.success) {
        console.log('Automation triggered successfully.');
      } else {
        console.error('Failed to trigger automation:', response?.error);
      }
    });
  };

  return (
    <>
      {/* <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={triggerAutomation} className="automate-btn">
          Automate LinkedIn
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p> */}
      <button onClick={triggerAutomation} className="automate-btn">
        Automate LinkedIn
      </button>
    </>
  );
}

export default App;
