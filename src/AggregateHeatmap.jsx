import React from 'react';
import interpolate from 'color-interpolate';
import { Stage, Layer, Rect} from 'react-konva';
import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import ProgressBar from "@ramonak/react-progress-bar";

const AggregateHeatmap = (arg) => {

  const [layerdata, setlayerdata] = React.useState({});

  // Select weight type and data sorting
  const [weightType, setWeightType] = React.useState(0);
  const [filterType, setFilterType] = React.useState(0);
  const [categoryAvg, setAvg] = React.useState(0);

  const fetchReview = () => {
    const jsonData = {"product_id": 2};
    return fetch(
      '/product-api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            "option": 'get-product',
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

    console.log(layerdata);

    const currentpos = e.target.getStage().getPointerPosition();
    const posX = Math.round(currentpos.x/layerdata.downscale_factor);
    const posY = Math.round(currentpos.y/layerdata.downscale_factor);
    const indexTranslated = layerdata.imageDimensions.width*posY + posX;   
    console.log(indexTranslated);       

    let weightMaps = {}
    let filterMap = {}
    switch(weightType) {
      case 1:
        weightMaps = layerdata.images.quality;
        break;
      case 2:
        weightMaps = layerdata.images.style;
        break;
      case 3:
        weightMaps = layerdata.images.fit;
        break;
      default:
        console.log("Weight Type", weightType, "does not exist")
        break;
    }

    switch(filterType) {
      case 2:
        filterMap = weightMaps.positive.map        
        break;
      case 3:
        filterMap = weightMaps.negative.map        
        break;
      case 4:
        filterMap = weightMaps.bias.map        
        break;
      default:
        console.log("Filter Type", filterType, "does not exist")
        return;
    }
    
    setAvg(filterMap[indexTranslated] / layerdata.reviews_count);
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
    if (Object.keys(layerdata).length === 0 || weightType === 0 || filterType === 0) {
      return <div/>;
    }
    
    let weightMaps = {}
    let filterMap = {}
    let colorFunc = interpolate(['#FF0000A0', '#00FF00A0'])
    let boundMap = (x) => {return x};

    switch(weightType) {
      case 1:
        weightMaps = layerdata.images.quality;
        break;
      case 2:
        weightMaps = layerdata.images.style;
        break;
      case 3:
        weightMaps = layerdata.images.fit;
        break;
      default:
        console.log("Weight Type", weightType, "does not exist")
        break;
    }

    switch(filterType) {
      case 2:
        filterMap = weightMaps.positive.map
        colorFunc = interpolate(['#00000000', '#00FF00A0'])
        boundMap = (x) => {return x};
        break;
      case 3:
        filterMap = weightMaps.negative.map
        colorFunc = interpolate(['#00000000', '#FF0000A0'])
        boundMap = (x) => {return -x};
        break;
      case 4:
        filterMap = weightMaps.bias.map
        colorFunc = interpolate(['#00000000', '#FFBC00A0'])
        boundMap = (x) => {return 1-x};
        break;
      default:
        console.log("Filter Type", filterType, "does not exist")
        return;
    }

    //console.log(layerdata);
    const renderContent = [];
    const dsFactor = layerdata.downscale_factor;
    const width = layerdata.imageDimensions.width;
    const height = layerdata.imageDimensions.height;
    let value = 0;

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        value = filterMap[h*width + w];
        if (value) {
          renderContent.push(
            <Rect
              x={w*dsFactor}
              y={h*dsFactor}
              width={dsFactor}
              height={dsFactor}
              fill={colorFunc(boundMap(value))}
            />
          )
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
        <div style={{padding: '10px'}}>
          <FormControl>
            <FormLabel id="criteria-select-label">Review Criteria</FormLabel>
            <RadioGroup
              aria-labelledby="criteria-select-label"
              defaultValue={0}
              name="radio-buttons-group"
              onChange={(e) => {setWeightType(+e.target.value)}}
              row
              justify="center"
            >
              <FormControlLabel value={1} control={<Radio />} label="Quality"/>
              <FormControlLabel value={2} control={<Radio />} label="Style"/>
              <FormControlLabel value={3} control={<Radio />} label="Fit"/>
            </RadioGroup>
          </FormControl>
          <br/>
          <FormControl>
            <FormLabel id="criteria-select-label">View Filter</FormLabel>
            <RadioGroup
              aria-labelledby="criteria-select-label"
              defaultValue={0}
              name="radio-buttons-group"
              onChange={(e) => {setFilterType(+e.target.value)}}
              row
            >
              {/*<FormControlLabel value={1} control={<Radio />} label="Overall" />*/}
              <FormControlLabel value={2} control={<Radio />} label="Positive" />
              <FormControlLabel value={3} control={<Radio />} label="Negative" />
              <FormControlLabel value={4} control={<Radio />} label="Bias" />
            </RadioGroup>
          </FormControl>
        </div>

        <div style={{position: 'relative', marginLeft: 'auto', marginRight:'auto', marginBottom: '15px', width: imageInfo.width}}>
          <label>Average on Clicked Location:</label>            
          <ProgressBar completed={Math.round(categoryAvg*100)} bgColor="#ff6666" />
        </div>

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

export default AggregateHeatmap;
