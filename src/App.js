import { useState, useEffect } from 'react';

import { BrowserRouter , Routes , Route } from 'react-router-dom';


import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';




function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState(null)

  const fetchData = async () => {
    const restaurantsData = await axios.get('http://localhost:8000/restaurants')
    const data = Object.keys(restaurantsData.data.data).map(restaurant => restaurantsData.data.data[restaurant])
    setRestaurants(data)
    console.log(data)

  }

  useEffect(() => {
    fetchData();
    setSearch(" ")
  }, [])


  const deleteRestaurant = () => {
    console.log('Delete Restaurant')
  }

  const searchRestaurant = (event) => {
    setSearch(event.target.value)
  }

  let filteredRestaurants = restaurants.filter(
    (restaurant) => {
      return restaurant.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1
    }
  ).sort(( a , b) => {
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  }
  );

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
