import React from 'react';
import { Stage, Layer, Line} from 'react-konva';
import Slider from '@mui/material/Slider';

const Canvas = (arg) => {

    const colors = [
        {id: 0, color: "red", colorCode: "#FF0000A0"},
        {id: 1, color: "green", colorCode: "#00FF00A0"},
        {id: 2, color: "blue", colorCode: "#0000FFA0"},
        {id: 3, color: "pink", colorCode: "#FF00FFA0"},
        {id: 4, color: "eraser", colorCode: "#000000FF"},
    ]

    const [layerID, setTool] = React.useState(0);
    const [strokeSize, setStrokeSize] = React.useState(30);
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const canvasCtx = React.useRef({});
    const [imageInfo, setImageInfo] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [layerData, updateLayer] = React.useState(
        colors.map((color, i) => (
            {
                // ID of the color
                layerID: color.id,

                // Lines
                lines: [],

                // Imagedata
                imageData: [],

                // -1 to 1, default is 0 which means no opinion
                weights: {
                    quality:0,
                    style:0,
                    fit:0,
                    // Other weights
                }
            }
        ))
    );

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        let updatedLayer = [...layerData];
        updatedLayer[layerID].lines = updatedLayer[layerID].lines.concat({ layerID, points: [pos.x, pos.y], strokeWidth: strokeSize});
        updateLayer(updatedLayer);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
        return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let updatedLayer = [...layerData];
        let lastLine = updatedLayer[layerID].lines[updatedLayer[layerID].lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        updatedLayer[layerID].lines.splice(updatedLayer[layerID].lines.length - 1, 1, lastLine);
        setLines(updatedLayer[layerID].lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const updateLayerWeight = (value, weightIndex) => {
        // Only way for react hooks to realize that we have a change is with a new array
        let updatedData = [...layerData];
        switch (weightIndex) {
            case 0:
                updatedData[layerID].weights.quality = value;
                break;
            case 1:
                updatedData[layerID].weights.style = value;
                break;
            case 2:
                updatedData[layerID].weights.fit = value;
                break;
            default:
                console.log("Invalid weight index");
                break;
        }

        updateLayer(updatedData);
    };

    const getImgDimensions = ({target: img}) => {
        // Update image info, we have to do this if we aren't passed the dimensions
        setImageInfo({
            width: img.naturalWidth,
            height: img.naturalHeight
        })
    }

    const saveCanvasCtx = () => {
        // Can't grab canvas until after it loads
        const canvasWrapper = document.getElementsByClassName("konvajs-content")[0];
        canvasCtx.current.ctx = canvasWrapper.children[0];
    }

    const downscaleAndBBox = (imageData, dsFactor) => {
        const dsWidth = Math.floor(imageData.width / dsFactor);
        const dsHeight = Math.floor(imageData.height / dsFactor);
        const pixelThreshold = Math.ceil(dsFactor*dsFactor/2);
        const dsImageData = {
            // Image buffer, size is width*height
            image: [],

            // Image dimensions
            width: dsWidth,
            height: dsHeight,

            // Bounding box covering the highlighted sections, represented by top-left and bottom-right corners
            bbox: {
                xMin: dsWidth, 
                yMin: dsHeight,
                xMax: -1,  
                yMax: -1
            }
        }

        for (let h = 0; h < dsHeight; h++) {
            for (let w = 0; w < dsWidth; w++) {
                let pixelCount = 0;
                let hMult = 4*imageData.width;
                let wMult = 4;

                // Check alpha in equivalent 2x2 block in original image
                if (imageData.data[((h)*hMult + (w)*wMult) + 3] > 0) pixelCount++; 
                if (imageData.data[((h)*hMult + (w+1)*wMult) + 3] > 0) pixelCount++; 
                if (imageData.data[((h+1)*hMult + (w)*wMult) + 3] > 0) pixelCount++; 
                if (imageData.data[((h+1)*hMult + (w+1)*wMult) + 3] > 0) pixelCount++; 

                // Decide if there are enough pixels in the original image to set this pixel
                // Threshold is set to fill in pixels where pixelCount >= dsFactor^2/2
                if (pixelCount >= pixelThreshold){
                    dsImageData.image.push(1);
                    if (w < dsImageData.bbox.xMin) dsImageData.bbox.xMin = w;
                    if (h < dsImageData.bbox.yMin) dsImageData.bbox.xMin = h;
                    if (w > dsImageData.bbox.xMax) dsImageData.bbox.xMin = w;
                    if (h > dsImageData.bbox.yMax) dsImageData.bbox.xMin = h;
                }
                else dsImageData.image.push(0);
                
            }
        }

        return dsImageData;
    }

    const saveImage = () => {
        const ctx = canvasCtx.current.ctx.getContext("2d");

        // Retrieve the ImageData data structure
        // https://developer.mozilla.org/en-US/docs/Web/API/ImageData
        const imageData = ctx.getImageData(0, 0, imageInfo.width-1, imageInfo.height-1);
        //console.log(imageData);

        // Set Downscale factor and give the work to a downscaling function
        // Naive bounding box function, pick min/max x and min/max ys to just save some computing space
        const dsFactor = 2;
        const dsImageData = downscaleAndBBox(imageData, dsFactor);
        //console.log(dsImageData);
    }

    // We render each color/layer separately so we can retrieve individual ImageData objects
    const layerRender = () => {
        const layerContent = [];

        for (let layer = 0; layer < 4; layer++) {
            layerContent.push(
                <Layer>   
                {
                layerData[layer].lines.map((line, i) => (
                    <Line
                    key={i}
                    points={line.points}
                    stroke={colors[line.layerID].colorCode}
                    strokeWidth={line.strokeWidth}
                    tension={0.8}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                        colors[line.layerID].color === 'eraser' ? 'destination-out' : 'source-over'
                    }
                    />
                ))}
                </Layer>
            )
        }

        console.log(layerContent)
        return (layerContent);
    }

    const onloadHandler = () => {
        // Do all onload stuff here
        console.log('Onload handler started')
        saveCanvasCtx();
    }
    
    window.onload = onloadHandler;

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
                    {layerRender()}
                </Stage>
            </div>
            <div style={{display:"block"}}>
                <select
                    value={layerID}
                    onChange={(e) => {
                    setTool(e.target.value);
                    }}
                >
                    <option value="0">red</option>
                    <option value="1">green</option>
                    <option value="2">blue</option>
                    <option value="3">pink</option>
                    <option value="4">eraser</option>
                </select>

                <select
                    value={strokeSize}
                    onChange={(e) => {
                    setStrokeSize(e.target.value);
                    }}
                >
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                </select>
                
                <div style={{margin:'auto', width:'10%'}}>
                    <Slider aria-label="Quality" size="small"
                        value={layerData[layerID].weights.quality} onChange={(e) => {
                            console.log(lines);
                            updateLayerWeight(e.target.value, 0);
                    }} />
                    <Slider aria-label="Style" size="small"
                        value={layerData[layerID].weights.style} onChange={(e) => {
                            updateLayerWeight(e.target.value, 1);
                    }} />
                    <Slider aria-label="Fit" size="small"
                        value={layerData[layerID].weights.fit} onChange={(e) => {
                            updateLayerWeight(e.target.value, 2);
                    }} />
                </div>

                <input type="button" value="Save" onClick={saveImage}/>
            </div>
        </div>
    );
};

export default Canvas;
