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
    <div className="app-container">
      <header className="app-header">
        <h1>LinkedIn Automation</h1>
      </header>
      <main className="app-main">
        <button onClick={triggerAutomation} className="automate-btn">
          Automate LinkedIn
        </button>
      </main>
    </div>
  );
}

export default App;
