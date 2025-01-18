import { useEffect, useState } from 'react'
import './App.css'
import DrawingComponent from '../components/DrawingComponent';
import Banner from '../components/Banner';

function App() {
  const [mapHtml, setMapHtml] = useState<string>('');
  
  useEffect(() => {
    fetch('http://localhost:5000/api/map')
      .then(response => response.json())
      .then(data => setMapHtml(data.map))
      .catch(error => console.error('Error fetching map:', error));
  }, []);
  return (
    <div className="App">
      <Banner />
      <div className="content">
        {/* Display the Leaflet map */}
        <DrawingComponent canvasWidth={400} canvasHeight={600}/>
        
        {/* Display the Folium map */}
        <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
      </div>
    </div>
  )
}

export default App;
