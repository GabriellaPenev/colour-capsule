import { useRef, useState, useEffect } from 'react';

const Canvas = ({ selectedColor, setSelectedColor }) => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const lineWidthRef = useRef(null)
    const opacityRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(75)
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        canvas.style.backgroundColor = '#ffffff'
        canvas.style.border = 'solid 1px black'

        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 3000, 3000);
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
        ctxRef.current.globalAlpha = opacity;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    }

    const clear = () => {
        ctxRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
            setSelectedColor('#000'),
            setLineWidth(75),
            setOpacity(1)
        )

        // reset the line thickness and opacity values:
        lineWidthRef.current.value = 75
        opacityRef.current.value = 1
    }

    const erase = () => {
        ctxRef.current.strokeStyle = setSelectedColor('white');
        ctxRef.current.globalCompositionOperation = 'destination-out';
    }
    
    const download = (e) => {
        let link = e.currentTarget
        link.setAttribute('download', 'drawing.png');
        let image = canvasRef.current.toDataURL('drawing/png');
        link.setAttribute('href', image);

    }
    
    // add e.preventDefault() in touchStart function to prevent swiping / refresh from pulling down ``
    
    return (
        <>
            <div className="controls">
                <label className='lineWidth' htmlFor="lineWidth">Line Thickness: </label>
                <input ref={lineWidthRef} type="range" id="lineWidth" name="lineWidth"
                    min="1" max="145" defaultValue={lineWidth} step="1"
                    style={{ 'background': selectedColor }}
                    onChange={(e) => setLineWidth(e.target.value)} />

                <label className='opacity' htmlFor="opacity">Opacity: </label>
                <input ref={opacityRef} type="range" id="opacity" name="opacity"
                    min="0.1" max="1" defaultValue={opacity} step="0.1"
                    style={{ 'background': selectedColor }}
                    onChange={(e) => setOpacity(e.target.value)} />
            </div>
            <div className='canvasContainer'>
                <canvas
                    aria-label="Drawing Canvas" role="img" tabIndex="0"
                    ref={canvasRef}

                    onMouseMove={draw}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onMouseEnter={stopDrawing}

                    onPointerDown={startDrawing}
                    onPointerUp={stopDrawing}
                    onPointerMove={draw}
                    style={{ 'touchAction': 'none'}}
                />
            </div>
            <div className="canvasActions">
                <button onClick={clear}>Clear</button>
                <button onClick={erase}>Erase</button>
                <button>
                    <a id='download-image-link' href="download-link" onClick={download}>Download drawing</a>
                </button>
            </div>

        </>
    )
}

export default Canvas;
