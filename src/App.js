import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';
import AddRestaurant from './components/AddRestaurant';
import EditRestaurant from './components/EditRestaurant';




function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState(null)
  const [map, setMap] = useState(new Map())

  const fetchData = async () => {
    const restaurantsData = await axios.get('http://localhost:8000/restaurants')

    const data = Object.keys(restaurantsData.data.data).map(restaurant => restaurantsData.data.data[restaurant])
    const keys = Object.keys(restaurantsData.data.data)

    setRestaurants(data)

    for (let i = 0; i < keys.length; i++) {
      setMap(map.set( keys[i] , data[i] ))
    }

  }

  useEffect(() => {
    fetchData();
    setSearch(" ")
  }, [])

  const getRestaurants = async () => {  // Axios method Local Api   // axios dowload npm i axios

    const restaurantsData = await axios.get('http://localhost:8000/restaurants')

    const data = Object.keys(restaurantsData.data.data).map(restaurant => restaurantsData.data.data[restaurant])
    const keys = Object.keys(restaurantsData.data.data)

    setRestaurants(data)

    const newMap = map.clear()

    setMap(newMap)

    for (let i = 0; i < keys.length; i++) {
      setMap(map.set( keys[i] , data[i] ))
    }
  }

  let filteredRestaurants = restaurants.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1
    }
  ).sort((a, b) => {
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  }
  );

  const editRestaurant = async () => {
    getRestaurants()
  }


  const addRestaurant = async (newRestaurant) => {

    let highId = 0;

    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id > highId) {
        highId = restaurants[i].id;
      }
    }

    newRestaurant.id = highId + 1;

    const baseUrl = 'http://localhost:8000/addRestaurant';

    await axios.post(baseUrl, newRestaurant)
    .then(response => {
      getRestaurants()
    }).catch(error => {
      console.log(error)
    })

    

  }


  const deleteRestaurant = async (deleteRestaurant) => {

    let key = ""

    for (const tempKey of map.keys()) {
      if(map.get(tempKey) === deleteRestaurant) {
        key = tempKey
      }
    }

    await axios.delete(`http://localhost:8000/deleteRestaurant/${key}`)

    
    let tempMap = map 

    tempMap.delete(key)

    setMap(tempMap)

    const newRestaurantList = restaurants.filter(restaurant => restaurant !== deleteRestaurant)

    setRestaurants(newRestaurantList)

  }

  const searchRestaurant = (event) => {
    setSearch(event.target.value)
  }




  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <div className="container">

            <div className="row">
              <div className="col-lg-12">
                <br />
                <h1
                  style={{
                    color: "red",
                    fontSize: "50px",
                    fontFamily: "cursive",
                    align: "center",
                    marginLeft: "350px",
                    marginTop: "50px",
                    marginBottom: "50px"
                  }}
                >My Restaurant List</h1>
                <br />
                <SearchBar
                  searchProp={searchRestaurant}
                />
              </div>
            </div>

            <RestaurantList
              restaurants={filteredRestaurants}
              map = {map}
              deleteRestaurantProp={deleteRestaurant}
            />

          </div>
        } />

        <Route path="/addRestaurant" element={
          <AddRestaurant
            onAddRestaurant={(restaurant) => { addRestaurant(restaurant) }}
          />
        } />

        <Route path="/editRestaurant/:id" element={
          <EditRestaurant
            editRestaurant={() => { editRestaurant() }}
          />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
