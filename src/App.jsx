import './styles/App.css';
import Menu from "./components/Menubar.jsx"
// Import Images from "./com"
import 'bootstrap/dist/css/bootstrap.css';
import CanvasPage from './CanvasPage';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Auth from "./components/Auth.jsx"
import { datadogLogs } from '@datadog/browser-logs'
import React, { Component }  from 'react';

function App() {
  datadogLogs.init({
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    forwardErrorsToLogs: true,
    sampleRate: 100,
  })
  return (
    <div className="App">
      <Menu/>
      {/* <p id="app-live">Hello World</p> */}
      <Routes>
        <Route path="/canvas" element={<CanvasPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/Images" element={<Auth/>} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
