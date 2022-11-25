import './styles/HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {

  return (

    <div style={{textAlign: "center"}}>
      <header style={{backgroundColor: "#82C3FF05", minHeight: "100vh"}}>
        <p>
          HomePage goes here
        </p>

        {/*Temporary, used to work on pages individually for now*/}
        <Link to="/canvas">
          Canvas
        </Link>
        
        <br/>

        <Link to="/dashboard">
          Dashboard
        </Link>
      </header>
    </div>
  );
}

export default HomePage;
