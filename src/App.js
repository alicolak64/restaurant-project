import { useState , useEffect } from 'react';
import axios from 'axios';

import './App.css';



function App() {

  const [restaurants, setRestaurants] = useState(null);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/restaurants');
    const data = Object.keys(response.data.data).map (restaurant => response.data.data[restaurant]);
    setRestaurants(data)
  }

  useEffect(() => {
    fetchData();
  } , [])

  console.log(restaurants)

  return (
    <div className="App">
      Hello world
    </div>
  );
}

export default App;
