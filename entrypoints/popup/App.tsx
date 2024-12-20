import './App.css';

function App() {
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
      <button onClick={triggerAutomation} className="automate-btn">
        Automate LinkedIn
      </button>
    </>
  );
}

export default App;
