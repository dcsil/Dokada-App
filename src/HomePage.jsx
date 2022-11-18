import './styles/HomePage.css';
import { Link } from 'react-router-dom';
import React, { Component }  from 'react';
import Button from 'react-bootstrap/Button';


function HomePage() {
  return (

    <div style={{textAlign: "center"}}>
      <header style={{backgroundColor: "#82C3FF05", minHeight: "100vh"}}>
        <p>
          HomePage goes here
        </p>
        {/*Temporary, used to work on pages individually for now*/}

        {/* <Link to="/canvas">Canvas</Link> */}
        <Button href="#/canvas" variant="outline-success" size="lg" style={{width: 150}}>Canvas</Button>
        <br/>
        <br/>
        <Button href="#/dashboard" variant="outline-success" size="lg" style={{width: 150}}> Dashboard</Button>{' '}

        {/* <div className="d-grid gap-2">

          
      <Button variant="outline-success" size="lg">
        Block level button
      </Button>

      
      <Button variant="secondary" size="lg">
        Block level button
      </Button>
    </div> */}
      </header>
      

    </div>

    
    
  );
}

export default HomePage;
