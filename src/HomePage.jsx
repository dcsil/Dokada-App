import './styles/HomePage.css';
// import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

function HomePage() {
  return (
    <div style={{ textAlign: "center" }}>
      {/* <header style={{ backgroundColor: "#82C3FF05", minHeight: "100vh" }}> */}
      {/* <p>HomePage goes here!!!</p> */}

      {/*Temporary, used to work on pages individually for now*/}
      <br />
      <Button
        href="#/canvas"
        variant="contained"
        size="large"
        color="secondary"
        style={{ width: 200 }}
        className="gradient-custom-2"
      >
        Canvas
      </Button>
      <br />
      <br />
      <Button
        href="#/dashboard"
        variant="contained"
        size="large"
        color="secondary"
        style={{ width: 200 }}
        className="gradient-custom-2"
      >
        Dashboard
      </Button>
      <br />
      <br />

      <Button
        href="#/login"
        variant="contained"
        size="large"
        color="secondary"
        style={{ width: 200 }}
        className="gradient-custom-2"
      >
        Login
      </Button>
      {/* <Link to="/dashboard">Dashboard</Link> */}
      {/* </header> */}
    </div>
  );
}

export default HomePage;
