import React from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

const Canvas = () => {
    const tools = [
        {id: 0, color: "eraser", colorCode: "#000000FF"},
        {id: 1, color: "red", colorCode: "#FF0000A0"},
        {id: 2, color: "green", colorCode: "#00FF00A0"},
        {id: 3, color: "blue", colorCode: "#0000FFA0"},
        {id: 4, color: "pink", colorCode: "#FF00FFA0"},
    ]

    // Put stroke width here lol

    const [toolID, setTool] = React.useState(1);
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { toolID, points: [pos.x, pos.y] }]);
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

    return (
        <div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                <Text text="Just start drawing" x={5} y={30} />
                {lines.map((line, i) => (
                    <Line
                    key={i}
                    points={line.points}
                    stroke={tools[line.toolID].colorCode}
                    strokeWidth={30}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                        tools[line.toolID].color === 'eraser' ? 'destination-out' : 'source-over'
                    }
                    />
                ))}
                </Layer>
            </Stage>
            <select
                value={toolID}
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
        </div>
    );
};

export default Canvas;
