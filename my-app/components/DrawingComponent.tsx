import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

interface DrawingComponentProps {
  canvasWidth: number;
  canvasHeight: number;
}

const DrawingComponent: React.FC<DrawingComponentProps> = ({canvasWidth, canvasHeight}) => {
  const canvasRef = useRef<CanvasDraw>(null);

  const exportDrawingAsPng = () => {
    if (canvasRef.current) {
      const jsonData = canvasRef.current.getSaveData();
      console.log(jsonData);
    }
  };

  return (
    <div className="drawing-container">
      <CanvasDraw 
        ref={canvasRef} 
        canvasWidth={canvasWidth} 
        canvasHeight={canvasHeight}
        className="canvas-draw" 
      />
      <button className="button" onClick={exportDrawingAsPng}>Export Drawing as PNG</button>
    </div>
  );
};

export default DrawingComponent;