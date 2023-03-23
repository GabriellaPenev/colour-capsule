import { useRef, useState, useEffect } from 'react';
import { forwardRef } from "react";

const Canvas = forwardRef(({ selectedColor, setSelectedColor, canvasRef }, ref) => {

    const ctxRef = useRef(null);
    const lineWidthRef = useRef(null)
    const opacityRef = useRef(null)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(60)
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // listen for when the window width is resized, then run useEffect below that resets the canvas:
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.style.width = '100%';
        canvas.style.height = "100%";
        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        canvas.style.backgroundColor = 'white';
        canvas.style.border = 'solid 2px black';

        const ctx = canvasRef.current.getContext('2d');
        ctxRef.current = ctx;
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 3000, 3000);
    }, [windowWidth]);


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

    const reset = () => {
        // reset states holding paintbrush color, line thickness and opacity, their input values
        setSelectedColor('#000')
        setLineWidth(60)
        setOpacity(1)
        lineWidthRef.current.value = 60;
        opacityRef.current.value = 1;

        ctxRef.current.globalAlpha = 1;
        ctxRef.current.fillRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
            canvasRef.current.style.backgroundColor = 'white'
        )
    }

    const erase = () => {
        setOpacity(1)
        opacityRef.current.value = 1;
        ctxRef.current.strokeStyle = setSelectedColor('white');
        ctxRef.current.globalCompositionOperation = 'destination-out';
    }

    const download = (e) => {
        let link = e.currentTarget
        let image = canvasRef.current.toDataURL('drawing/png');
        link.setAttribute('download', 'drawing.png');
        link.setAttribute('href', image);
    }

    const changeOpacity = (e) => {
        setOpacity(e.target.value)
    }

    const changeLinedWidth = (e) => {
        setLineWidth(e.target.value)
    }


    return (
        <>
            <h3 className="intro introSpan" ref={ref}>Time to draw! Click on any of the capsule colours above to use on the canvas. Once you're finished you can download your painting, and add it to the gallery below!</h3>
            <div className="controls">
                <label className='lineWidth' htmlFor="lineWidth">Line Thickness: </label>
                <input ref={lineWidthRef} type="range" id="lineWidth" name="lineWidth"
                    min="1" max="120" defaultValue={lineWidth} step="1"
                    style={{ 'background': selectedColor, 'border': 'black 1px solid' }}
                    onChange={(e) => changeLinedWidth(e)} />

                <label className='opacity' htmlFor="opacity">Opacity: </label>
                <input ref={opacityRef} type="range" id="opacity" name="opacity"
                    min="0.1" max="1" defaultValue={opacity} step="0.1"
                    style={{ 'background': selectedColor, 'border': 'black 1px solid' }}
                    onChange={(e) => changeOpacity(e)} />
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
                    style={{ 'touchAction': 'none' }}
                />
            </div>
            <div className="canvasActions">
                <button onClick={reset}>Reset</button>
                <button onClick={erase}>Erase</button>
                <button>
                    <a id='download-image-link' href="download-link" onClick={download}>Download</a>
                </button>
            </div>
        </>
    )
})

export default Canvas;
