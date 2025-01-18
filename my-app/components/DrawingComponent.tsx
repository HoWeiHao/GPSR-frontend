import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

interface DrawingComponentProps {
  canvasWidth: number;
  canvasHeight: number;
  onDrawingUpdate: (routes: number[][][]) => void;
}

const DrawingComponent: React.FC<DrawingComponentProps> = ({
  canvasWidth,
  canvasHeight,
  onDrawingUpdate,
}) => {
  const canvasRef = useRef<CanvasDraw>(null);

  const exportDrawingAsPng = async () => {
    if (canvasRef.current) {
      const jsonData = canvasRef.current.getSaveData();
      console.log(jsonData);

      const response = await fetch("http://localhost:8888/api/points_to_route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      const data = await response.json()

      onDrawingUpdate(data.routes)
    }
  };
  const clearDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
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
      
      <button className="button" onClick={clearDrawing}>Export gpx</button>
      <button className="button" onClick={clearDrawing}>Clear Drawing</button>
    </div>
  );
};

export default DrawingComponent;
