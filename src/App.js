import { useState, useEffect } from 'react';

import { BrowserRouter , Routes , Route } from 'react-router-dom';


import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';




function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState(null)
  const [map, setMap] = useState(new Map())
  const [keys , setKeys] = useState([])

  const fetchData = async () => {
    const restaurantsData = await axios.get('http://localhost:8000/restaurants')
    

    const data = Object.keys(restaurantsData.data.data).map(restaurant => restaurantsData.data.data[restaurant])
    const keys = Object.keys(restaurantsData.data.data)

    setRestaurants(data)
    setKeys(keys)

    for (let i = 0; i < keys.length; i++) {
      setMap(map.set(keys[i], data[i]))
    }
    
  }

  useEffect(() => {
    fetchData();
    setSearch(" ")
  }, [])

  let filteredRestaurants = restaurants.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1
    }
  ).sort(( a , b) => {
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  }
  );


  const addMovie = async (newRestaurant) => {

    const baseUrl = 'http://localhost:8000/addRestaurant';

    await axios.post(baseUrl, newRestaurant)


    // await axios.post(baseUrl, movie)
    // this.setState(state => ({
    //   movies: state.movies.concat([movie])
    // }
    // )
    // )
    // this.getMovies()
  }
  

  const deleteRestaurant = async (deleteRestaurant) => {

    const id = keys[restaurants.indexOf(deleteRestaurant)]

    await axios.delete(`http://localhost:8000/deleteRestaurant/${id}`)


    const index = restaurants.indexOf(deleteRestaurant)
    const newRestaurantList = restaurants.pop(deleteRestaurant)

    setMap(map.delete(keys[index]))
    setKeys(keys.filter(k => k !== keys[index]))

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
                  style = {{
                    color : "red" ,
                    fontSize : "50px" ,
                    fontFamily : "cursive" ,
                    align : "center" ,
                    marginLeft : "350px" ,
                    marginTop : "50px" ,
                    marginBottom : "50px"
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
                deleteRestaurantProp={deleteRestaurant}
              />

            </div>
          } />

          {/* <Route path="/addRestaurant" element={
            <AddMovie
              onAddMovie={(movie) => { this.addMovie(movie) }}
            />
          } />

          <Route path="/editRestaurant/:id" element={
            <EditMovie
              editMovie = {() => { this.editMovie() }}
            />
          } /> */}

        </Routes>
      </BrowserRouter>
  );
}

export default App;
