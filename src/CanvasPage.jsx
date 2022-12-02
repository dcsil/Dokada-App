import './styles/CanvasPage.css';
import React, { useState } from "react";
import Canvas from "./Canvas";
import Carousel_ from "./components/Carousel";
import jacket from "./images/denim_jacket.png";
// import tshirt from "./images/tshirt.png";
// import pants from "./images/pants.png";
// import shirt from "./images/pants2.png";

function CanvasPage() {
  // If anyone fetches data here please use a react hook for componentDidMount.
  const [imageInfo, setImageInfo] = useState({
    imageReady: false,
  });

  const updateImageid = (imgpath, imgId) => {
    setImageInfo({
      imageId: imgId,
      imageUrl: imgpath,
      imageReady: true,
    });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <header style={{ backgroundColor: "#82C3FF05", minHeight: "100vh" }}>
        <h3 style={{ margin: 60, marginBottom: 40 }}>
          Please choose the product you would like to provide a feedback for,
          and then use the canvas{" "}
        </h3>
        <div>
          {/* Hard code the image url for the canvas for now*/}
          <div style={{ margin: 20, marginBottom: 50 }}>
            <Carousel_ updateFunction={updateImageid} />
          </div>
          {imageInfo.imageReady ? <Canvas imageInfo={imageInfo} /> : <div />}
        </div>
      </header>
    </div>
  );
}

export default CanvasPage;
