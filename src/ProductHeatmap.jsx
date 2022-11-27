import React from 'react';
import { Stage, Layer, Rect} from 'react-konva';
//import getLayers from './HardcodelayerData';

// ComponentDidMount equivalent

const ProductHeatmap = (arg) => {

  // Fetch data from HardcodelayerData
  //const layerdata = getLayers();
  //console.log(layerdata);

  const [layerdata, setlayerdata] = React.useState({});

  const fetchReview = () => {
    const jsonData = {"review_id": 26};
    return fetch(
      '/image-api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            "option": 'get-review',
            'content': jsonData
          })
      }
    ).then((response) => response.json())
    .then((data) => {
      console.log('Success in retrieving review');
      //console.log(data.content)
      setlayerdata(data.content);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const [imageInfo, setImageInfo] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleMouseDown = (e) => {
    
  };

  const handleMouseMove = (e) => {
    
  };

  const handleMouseUp = () => {
    
  };

  const getImgDimensions = ({target: img}) => {
    // Update image info, we have to do this if we aren't passed the dimensions
    setImageInfo({
        width: img.naturalWidth,
        height: img.naturalHeight
    })
  }

  const drawheatmap = () => {
    if (Object.keys(layerdata).length === 0) {
      return <div/>;
    }

    //console.log(layerdata);
    const renderContent = [];
    const dsFactor = layerdata.dimensions.downscale_factor;
    const colors = [
      {id: 0, color: "red", colorCode: "#FF0000A0"},
      {id: 1, color: "green", colorCode: "#00FF00A0"},
      {id: 2, color: "blue", colorCode: "#0000FFA0"},
      {id: 3, color: "pink", colorCode: "#FF00FFA0"},
      {id: 4, color: "eraser", colorCode: "#000000FF"},
    ]
    const layerCount = layerdata.layers.length-1;
    for (let layer = 0; layer < layerCount; layer++) {
      let wBox = layerdata.layers[layer].imageData.bbox.xMax - layerdata.layers[layer].imageData.bbox.xMin;
      let hBox = layerdata.layers[layer].imageData.bbox.yMax - layerdata.layers[layer].imageData.bbox.yMin;
      //console.log(layerdata.layers[layer]);

      for (let h = 0; h < hBox; h++) {
        for (let w = 0; w < wBox; w++) {
          let xDs = layerdata.layers[layer].imageData.bbox.xMin + w;
          let yDs = layerdata.layers[layer].imageData.bbox.yMin + h;
          if (layerdata.layers[layer].imageData.image[yDs*layerdata.dimensions.width + xDs]) {
            renderContent.push(
              <Rect
                x={xDs*dsFactor}
                y={yDs*dsFactor}
                width={dsFactor}
                height={dsFactor}
                fill={colors[layer].colorCode}
              />
            )
          }
        }
      }
    }

    return renderContent;
  }

  // ComponentDidMount equivalent
   React.useEffect(() => {
    console.log('Initial rendering complete')
    fetchReview();
  }, []);

  return (
    /*
        Important to have this relative and img absolute. The img element will be absolute relative to its parent
    */
    <div>
        <div style={{position: 'relative', margin:'auto', padding:'10px', width: imageInfo.width, height:imageInfo.height}}>
            <img id="imageUnderCanvas" style={{position: 'absolute', left: 0, top: 0, borderStyle: 'solid'}} onLoad={getImgDimensions} src={arg.imageUrl} alt={"Cannot retrieve" + arg.imageUrl}/>
            <Stage
                id="canvasStage"
                style={{position: 'absolute', left: 0, top: 0}}
                width={imageInfo.width}
                height={imageInfo.height}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                  {drawheatmap()}
                </Layer>
            </Stage>
        </div>
    </div>
);
}

export default ProductHeatmap;
