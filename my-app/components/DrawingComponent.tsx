import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

interface DrawingComponentProps {
  canvasWidth: number;
  canvasHeight: number;
  onDrawingUpdate: (routes: number[][][] | null) => void;
}

const DrawingComponent: React.FC<DrawingComponentProps> = ({
  canvasWidth,
  canvasHeight,
  onDrawingUpdate,
}) => {
  const canvasRef = useRef<CanvasDraw>(null);

  const visualizeOnMap = async () => {
    if (canvasRef.current) {
      const jsonData = canvasRef.current.getSaveData();
      console.log(jsonData);

      const response = await fetch(
        "http://localhost:8888/api/points_to_route",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        }
      );

      const data = await response.json();

      onDrawingUpdate(data.routes);
    }
  };
  const clearDrawing = async () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }

    onDrawingUpdate(null);
  };

  return (
    <div className="drawing-container">
      <CanvasDraw
        ref={canvasRef}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        brushRadius={5}
        className="canvas-draw"
      />
      <div className="button-container">
        <button className="button" onClick={visualizeOnMap}>
          Visualize On Map
        </button>
        <button className="button" onClick={clearDrawing}>
          Clear Drawing
        </button>
      </div>
    </div>
  );
};

export default DrawingComponent;
