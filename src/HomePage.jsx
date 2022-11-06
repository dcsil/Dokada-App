import './styles/HomePage.css';

function HomePage() {
  return (

    <div style={{textAlign: "center"}}>
      <header style={{backgroundColor: "#82C3FF05", minHeight: "100vh"}}>
        <p>
          HomePage goes here
        </p>

        {/*Temporary, used to work on pages individually for now*/}
        <a href="/canvas">
          Canvas
        </a>
        
        <br/>

        <a href="/dashboard">
          Dashboard
        </a>
      </header>
    </div>
  );
}

export default HomePage;
