import React from 'react'; // Importing React
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import './index.css'; // Importing global styles
import App from './App'; // Importing the main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Getting the root element
root.render(
  <React.StrictMode>
    <App /> // Rendering the App component
  </React.StrictMode>
);
