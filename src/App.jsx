import './styles/App.css';
import { Outlet } from 'react-router-dom';
import Menu from "./components/Menubar.jsx"
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Menu/>
=======
      <Navbar/>
      <p id="app-live">Hello World</p>
>>>>>>> main
      <Outlet/>
    </div>
  );
}

export default App;
