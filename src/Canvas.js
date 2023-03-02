import { useRef, useState, useEffect } from 'react';

const Canvas = ({ colors}) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.width = 1600;
        canvas.height = 1000;
        canvas.style.width = `800px`;
        canvas.style.height = `500px`;

        canvas.style.backgroundColor = 'white'
        canvas.style.border = 'solid 1px black'
        // Setting the context to enable us draw

        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 20;
        ctxRef.current = ctx;
    }, []);

    // start event on mouse x and y coords and setDrawing to true 
    const startDrawing = ({ nativeEvent }) => {// pass in a reference to nativeEvent to get the x and y coords
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        ctxRef.current.lineTo(offsetX, offsetY)
        setIsDrawing(true);
        console.log(colors)
    }

    // stop drawing and setDrawing to false
    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    }

    // continue drawing if drawing state is true, at mouse x and y coords
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    }

    // clear the canvas when done with the drawing
    const clear = () => {
        ctxRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        )
    }


    return (
        <div className='canvasContainer'>
            
            <canvas
                onMouseMove={draw}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                ref={canvasRef}
            />
            <button onClick={clear}>Clear canvas</button>
        </div>
    )
}

export default Canvas;