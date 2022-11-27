import './styles/App.css';
import Menu from "./components/Menubar.jsx"
import 'bootstrap/dist/css/bootstrap.css';
import CanvasPage from './CanvasPage';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./components/Auth.jsx";
import { datadogLogs } from "@datadog/browser-logs";

function App() {
  datadogLogs.init({
    clientToken: "<DATADOG_CLIENT_TOKEN>",
    site: "<DATADOG_SITE>",
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/canvas" element={<CanvasPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
