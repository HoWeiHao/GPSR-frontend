import { useEffect, useState } from 'react'
import './App.css'
import DrawingComponent from '../components/DrawingComponent';

function App() {
  const [mapHtml, setMapHtml] = useState<string>('');
  
  useEffect(() => {
    fetch('http://localhost:5000/api/map')
      .then(response => response.json())
      .then(data => setMapHtml(data.map))
      .catch(error => console.error('Error fetching map:', error));
  }, []);
  
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* Display the Leaflet map */}
      <DrawingComponent/>
      
      {/* Display the Folium map */}
      <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
    </div>
  )
}

export default App;
