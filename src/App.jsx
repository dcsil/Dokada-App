import './styles/App.css';
import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar.jsx"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <p id="app-live">Hello World</p>
      <Outlet/>
    </div>
  );
}

export default App;
