import React from 'react';
import { Stage, Layer, Rect} from 'react-konva';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import ProgressBar from "@ramonak/react-progress-bar";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductHeatmap = (arg) => {

  const [productReviews, setLayerData] = React.useState([]);
  const [productData, setProductData] = React.useState({});
  const [currentReview, setCurrentReview] = React.useState(0);
  const [previousReview, setPreviousReview] = React.useState(-1);
  const [renderContent, setRenderContent] = React.useState([]);

  const [qualitySlider, setQuality] = React.useState(0);
  const [styleSlider, setStyle] = React.useState(0);
  const [fitSlider, setFit] = React.useState(0);

  const fetchReview = () => {
    const jsonData = {"product_id": 2};
    return fetch(
      '/image-api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            "option": 'get-reviews-for-product',
            'content': jsonData
          })
      }
    ).then((response) => response.json())
    .then((data) => {
      console.log('Success in retrieving review');
      console.log(data.content)
      setLayerData(data.content.reviews);
      setProductData(data.content.dimensions)
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
      const currentpos = e.target.getStage().getPointerPosition();
      const posX = Math.round(currentpos.x/productData.downscale_factor);
      const posY = Math.round(currentpos.y/productData.downscale_factor);
      const indexTranslated = productData.width*posY + posX;   
      console.log(indexTranslated)   

      var qualityTotal = 0;
      var styleTotal = 0;
      var fitTotal = 0;

      const reviewData = productReviews[currentReview];
      const layerCount = reviewData.layers.length-1;
      //console.log(reviewData.layers[0])
      for (let i = 0; i < layerCount; i++) {   
        console.log(reviewData.layers[i].imageData.image[indexTranslated]);    
        if(reviewData.layers[i].imageData.image[indexTranslated] == 1){
          qualityTotal += reviewData.layers[i].weights["quality"];
          styleTotal += reviewData.layers[i].weights["style"];
          fitTotal += reviewData.layers[i].weights["fit"];
          console.log(reviewData.layers[i].weights);
        }        
      }

      setQuality(qualityTotal);
      setStyle(styleTotal);
      setFit(fitTotal);
  };

  const handleMouseMove = (e) => {
    
  };

  const handleMouseUp = () => {
    
  };

  const updateCurrentReview = (value) => {
    // Reset other stuff then set review
    if (currentReview !== value) {
      setCurrentReview(value);
    }
  };

  const getReviewSelect = () => {
    const menuItems = [];
    for (let i = 0; i < productReviews.length; i++) {
      menuItems.push(
        <MenuItem value={i}>{i}</MenuItem>
      );
    }

    return menuItems;
  }

  const getImgDimensions = ({target: img}) => {
    // Update image info, we have to do this if we aren't passed the dimensions
    setImageInfo({
        width: img.naturalWidth,
        height: img.naturalHeight
    })
  }

  const computeheatmap = () => {

    if (productReviews.length === 0 || currentReview === previousReview){
      return;
    }
    
    const reviewData = productReviews[currentReview];

    const newRenderContent = [];
    const dsFactor = productData.downscale_factor;
    const colors = [
      {id: 0, color: "red", colorCode: "#FF0000A0"},
      {id: 1, color: "green", colorCode: "#00FF00A0"},
      {id: 2, color: "blue", colorCode: "#0000FFA0"},
      {id: 3, color: "pink", colorCode: "#FF00FFA0"},
      {id: 4, color: "eraser", colorCode: "#000000FF"},
    ]
    const layerCount = reviewData.layers.length-1;
    for (let layer = 0; layer < layerCount; layer++) {
      let wBox = reviewData.layers[layer].imageData.bbox.xMax - reviewData.layers[layer].imageData.bbox.xMin;
      let hBox = reviewData.layers[layer].imageData.bbox.yMax - reviewData.layers[layer].imageData.bbox.yMin;


      for (let h = 0; h < hBox; h++) {
        for (let w = 0; w < wBox; w++) {
          let xDs = reviewData.layers[layer].imageData.bbox.xMin + w;
          let yDs = reviewData.layers[layer].imageData.bbox.yMin + h;
          if (reviewData.layers[layer].imageData.image[yDs*productData.width + xDs]) {
            newRenderContent.push(
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

    setRenderContent(newRenderContent);
    setPreviousReview(currentReview);
  }

  const drawheatmap = () => {
    if (productReviews.length === 0 || currentReview !== previousReview) {
      console.log('1');
      return (
        <div style={{margin:'auto'}}>        
          <CircularProgress size="8em"/>
        </div>
      )
    }
    else {
      console.log('2')
      return (
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
            {renderContent}
          </Layer>
        </Stage>
      )
    }
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
    <div><Container>      
        <div style={{padding: '10px', marginBottom: '20px'}}>          
          <FormControl fullWidth>
            <InputLabel id="review-select-label">Review #</InputLabel>
            <Select
              labelId="review-select-label"
              id="review-simple-select"
              value={currentReview}
              label="Select Review"
              onChange={(e)=>(updateCurrentReview(e.target.value))}
            >
              {getReviewSelect()}
            </Select>
          </FormControl>
        </div>      
      <Row>
      <Col sm={8}>
        <div style={{position: 'relative', margin:'auto', padding:'10px', width: imageInfo.width, height:imageInfo.height, display:'flex'}}>
            <img id="imageUnderCanvas" style={{position: 'absolute', left: 0, top: 0, borderStyle: 'solid'}} onLoad={getImgDimensions} src={arg.imageUrl} alt={"Cannot retrieve" + arg.imageUrl}/>
            {computeheatmap()}
            {drawheatmap()}
        </div>
      </Col>
      <Col sm={4}>
        
        <div style={{marginBottom: '10px'}}>
          <label>Quality:</label>            
          <ProgressBar completed={qualitySlider+50} bgColor="#ff6666" />
        </div>
        <div style={{marginBottom: '10px'}}>              
          <label>Style:</label>
          <ProgressBar completed={styleSlider+50} bgColor="#ff6666" />
        </div>  
        <div style={{marginBottom: '10px'}}>
          <label>Fit:</label>
          <ProgressBar completed={fitSlider+50} bgColor="#ff6666" />
        </div>
      </Col>
      </Row>
    </Container></div>
);
}

export default ProductHeatmap;
