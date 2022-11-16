import React from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import getLayers from './HardcodelayerData';

// ComponentDidMount equivalent

const ProductHeatmap = (arg) => {
  const layerdata = getLayers();
  console.log(layerdata);

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
    const renderContent = [];
    const dsFactor = 4;
    const colors = [
      {id: 0, color: "red", colorCode: "#FF0000A0"},
      {id: 1, color: "green", colorCode: "#00FF00A0"},
      {id: 2, color: "blue", colorCode: "#0000FFA0"},
      {id: 3, color: "pink", colorCode: "#FF00FFA0"},
      {id: 4, color: "eraser", colorCode: "#000000FF"},
    ]
    const layerCount = layerdata.length-1;
    for (let layer = 0; layer < layerCount; layer++) {
      let wBox = layerdata[layer].imageData.bbox.xMax - layerdata[layer].imageData.bbox.xMin;
      let hBox = layerdata[layer].imageData.bbox.yMax - layerdata[layer].imageData.bbox.yMin;
      console.log(layerdata[layer]);

      for (let h = 0; h < hBox; h++) {
        for (let w = 0; w < wBox; w++) {
          let xDs = layerdata[layer].imageData.bbox.xMin + w;
          let yDs = layerdata[layer].imageData.bbox.yMin + h;
          if (layerdata[layer].imageData.image[yDs*layerdata[layer].imageData.width + xDs]) {
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
