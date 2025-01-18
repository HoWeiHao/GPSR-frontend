import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

const DrawingComponent: React.FC = () => {
  const canvasRef = useRef<CanvasDraw>(null);

  const exportDrawingAsPng = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.canvas.drawing.toDataURL();
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div>
      <CanvasDraw ref={canvasRef} canvasWidth={800} canvasHeight={600} />
      <button onClick={exportDrawingAsPng}>Export Drawing as PNG</button>
    </div>
  );
};

export default DrawingComponent;