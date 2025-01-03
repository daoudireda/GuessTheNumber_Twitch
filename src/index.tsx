import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { NavigationProvider } from './contexts/NavigationContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </Router>
  </React.StrictMode>
); 