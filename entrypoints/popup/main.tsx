import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for createRoot
import './style.css';
import App from './App';

const container = document.getElementById('root'); // Get the root container
if (container) {
  const root = ReactDOM.createRoot(container); // Create a root
  root.render(<App />); // Render the app
}
