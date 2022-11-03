import './styles/CanvasPage.css';
import React from 'react';
import Canvas from './Canvas'

function CanvasPage() {
  // If anyone fetches data here please use a react hook for componentDidMount.
  return (
    <div style={{textAlign: "center"}}>
      <header style={{backgroundColor: "#82C3FF05", minHeight: "100vh"}}>
        <p>
          Canvas Page goes here
        </p>
        <div>
          <Canvas/>
        </div>
      </header>
    </div>
  );
}

export default CanvasPage;
