import './styles/CanvasPage.css';
import React from 'react';
import Canvas from './Canvas'

import jacket from './images/denim_jacket.png'

function CanvasPage() {
  // If anyone fetches data here please use a react hook for componentDidMount.
  return (
    <div style={{textAlign: "center"}}>
      <header style={{backgroundColor: "#82C3FF05", minHeight: "100vh"}}>
        <p>
          Canvas Page goes here
        </p>
        <div>
          {/*Hard code the image url for the canvas for now*/}
          <Canvas imageUrl={jacket}/>
        </div>
      </header>
    </div>
  );
}

export default CanvasPage;
