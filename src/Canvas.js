import { useRef, useState, useEffect } from 'react';

const Canvas = ({ selectedColor, setSelectedColor }) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const lineWidthRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5)

    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        canvas.style.backgroundColor = '#ffffff'
        canvas.style.border = 'solid 1px black'

        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 3000, 3000);
        ctxRef.current = ctx;
    }, []);

    // pass in a reference to nativeEvent to get the x and y coords
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.strokeStyle = selectedColor;
        ctxRef.current.lineWidth = lineWidth;
        ctxRef.current.moveTo(offsetX, offsetY);
        ctxRef.current.stroke();
        setIsDrawing(true);
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
        ctxRef.current.globalCompositionOperation = 'source-over';
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    }

    const clear = () => {
        // clear the canvas
        ctxRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
            setSelectedColor('#000'),
            setLineWidth(5)
        )

        // reset the line thickness range value:
        lineWidthRef.current.value = 5
    }

    const erase = () => {
        ctxRef.current.strokeStyle = setSelectedColor('white');
        ctxRef.current.globalCompositionOperation = 'destination-out';
    }

    const download = (e) => {
        // download the canvas drawing
        let link = e.currentTarget
        link.setAttribute('download', 'image.png');
        let image = canvasRef.current.toDataURL('image/png');
        link.setAttribute('href', image);

    }

    return (
        <>
            <div className="controls">
                <label htmlFor="lineWidth">Line Thickness</label>
                <input ref={lineWidthRef} type="range" id="lineWidth" name="lineWidth"
                    min="5" max="150" defaultValue={lineWidth} step="5"
                    onChange={(e) => setLineWidth(e.target.value)} />
                <button onClick={clear}>Clear</button>
                <button onClick={erase}>Erase</button>
                <button>
                    <a id='download-image-link' href="download-link" onClick={download}>Download Image</a>
                </button>
            </div>
            <div className='canvasContainer'>
                <canvas
                    onMouseMove={draw}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onMouseEnter={stopDrawing}
                    ref={canvasRef}
                />

            </div>

        </>
    )
}

export default Canvas;