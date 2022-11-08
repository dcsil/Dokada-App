import React from 'react';
import { Stage, Layer, Line} from 'react-konva';

const Canvas = (arg) => {

    const colors = [
        {id: 0, color: "eraser", colorCode: "#000000FF"},
        {id: 1, color: "red", colorCode: "#FF0000A0"},
        {id: 2, color: "green", colorCode: "#00FF00A0"},
        {id: 3, color: "blue", colorCode: "#0000FFA0"},
        {id: 4, color: "pink", colorCode: "#FF00FFA0"},
    ]

    const [colorID, setTool] = React.useState(1);
    const [strokeSize, setStrokeSize] = React.useState(30);
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const canvasCtx = React.useRef();
    const [imageInfo, setImageInfo] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { colorID, points: [pos.x, pos.y], strokeWidth: strokeSize}]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
        return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const getImgDimensions = ({target: img}) => {
        // Update image info, we have to do this if we aren't passed the dimensions
        setImageInfo({
            width: img.naturalWidth,
            height: img.naturalHeight
        })
    }

    const saveCanvasCtx = () => {
        const canvasWrapper = document.getElementsByClassName("konvajs-content")[0];
        canvasCtx.ctx = canvasWrapper.children[0];
    }

    const saveImage = () => {
        const ctx = canvasCtx.ctx.getContext("2d");
        const imageData = ctx.getImageData(0, 0, imageInfo.width-1, imageInfo.height-1);
        console.log(imageData);

        /*
            Image crunching algorithm here. We need to do downscaling here at the very least
            We might also write the bounding box here to save computing time so we don't need
            to group layers

            We should outsource the logic to a function so that we can call it on layers instead
            of just pixels
        */
    }

    const onloadHandler = () => {
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
                    <Layer>
                    
                    {/*
                    
                        This just renders each line one by one based on previous info and stuff
                    
                    */
                    lines.map((line, i) => (
                        <Line
                        key={i}
                        points={line.points}
                        stroke={colors[line.colorID].colorCode}
                        strokeWidth={line.strokeWidth}
                        tension={0.8}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation={
                            colors[line.colorID].color === 'eraser' ? 'destination-out' : 'source-over'
                        }
                        />
                    ))}
                    </Layer>
                </Stage>
            </div>
            <div style={{display:"block"}}>
                <select
                    value={colorID}
                    onChange={(e) => {
                    setTool(e.target.value);
                    }}
                >
                    <option value="1">red</option>
                    <option value="2">green</option>
                    <option value="3">blue</option>
                    <option value="4">pink</option>
                    <option value="0">eraser</option>
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

                <input type="button" value="Save" onClick={saveImage}/>
            </div>
        </div>
    );
};

export default Canvas;
