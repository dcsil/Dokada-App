import './styles/App.css';
import Menu from "./components/Menubar.jsx"
import 'bootstrap/dist/css/bootstrap.css';
import CanvasPage from './CanvasPage';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./components/Auth.jsx";
import useToken from "./components/useToken";
import { datadogLogs } from "@datadog/browser-logs";

function App() {
  datadogLogs.init({
    clientToken: "<DATADOG_CLIENT_TOKEN>",
    site: "<DATADOG_SITE>",
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
  const { token, removeToken, setToken } = useToken();
  return (
    <BrowserRouter>
      <div className="App">
        {/* {!token && token !== "" && token !== undefined ? (
          <Auth setToken={setToken} />
        ) : ( */}
        <>
          <Menu removeToken={removeToken} />
          <Routes>
            <Route
              exact
              path="/"
              // element={<HomePage />}
              element={<HomePage token={token} setToken={setToken} />}
            />
            <Route path="/canvas" element={<CanvasPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/login" element={<Auth />} /> */}
          </Routes>
        </>
        {/* )} */}
      </div>
    </BrowserRouter>
  );
}
export default App;
