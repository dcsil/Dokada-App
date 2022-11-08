import './styles/App.css';
import Menu from "./components/Menubar.jsx"
import 'bootstrap/dist/css/bootstrap.css';
import CanvasPage from './CanvasPage';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';
import Dasboard from './Dashboard';
import Auth from "./components/Auth.jsx"
import { datadogLogs } from '@datadog/browser-logs'

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
      <p id="app-live">Hello World</p>
      <Routes>
        <Route path="/canvas" element={<CanvasPage/>} />
        <Route path="/dashboard" element={<Dasboard/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
