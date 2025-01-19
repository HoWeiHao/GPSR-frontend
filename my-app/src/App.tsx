import { useEffect, useState } from "react";
import "./App.css";
import DrawingComponent from "../components/DrawingComponent";
import Banner from "../components/Banner";

function App() {
  const [mapHtml, setMapHtml] = useState<string>("");
  const [routes, setRoutes] = useState<number[][][]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/get_map")
      .then((response) => response.json())
      .then((data) => setMapHtml(data.map))
      .catch((error) => console.error("Error fetching map:", error));
  }, [routes]);

  const handleDrawingUpdate = async (updatedRoutes: number[][][]) => {
    // Send the updated routes to the map server
    try {
      const response = await fetch("http://localhost:5000/api/update_map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ routes: updatedRoutes }),
      });

      if (!response.ok) {
        console.error("Failed to update the map.");
      }
    } catch (error) {
      console.error("Error sending routes:", error);
    }

    setRoutes(updatedRoutes); // Update the state with new routes
  };

  return (
    <div className="App">
      <Banner />
      <div className="content">
        {/* Display the Leaflet map */}
        <DrawingComponent
          canvasWidth={400}
          canvasHeight={400}
          onDrawingUpdate={handleDrawingUpdate}
        />

        {/* Display the Folium map */}
        <div className="map-container">
          <div dangerouslySetInnerHTML={{ __html: mapHtml }} style={{
            width: "75vw",
            border: "1px solid black",
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;
