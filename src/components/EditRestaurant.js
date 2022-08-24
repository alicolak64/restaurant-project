import React from 'react'

import { useState , useEffect } from 'react';

import { useNavigate , Link , useParams } from "react-router-dom";

import axios from 'axios';


const EditRestaurant = (props) => {

    const [ name , setName ] = useState(" ")
    const [ rate , setRate ] = useState(" ")
    const [ address , setAddress ] = useState(" ")
    const [ country , setCountry ] = useState(" ")
    const [ zipcode , setZipcode ] = useState(" ")
    const [ web , setWeb ] = useState(" ")
    const [ image , setImage ] = useState(" ")
    const [ description , setDescription ] = useState(" ")
    const [ menu , setMenu ] = useState(" ")

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

    })

        

    //     const restaurantsData = await axios.get('http://localhost:8000/getRestaurant/' + id)


    //     // declare the data fetching function
    //     const fetchData = async () => {

        

    //         const response = await axios.get( baseUrl + "/" + id );

    //         const data = response.data;

    //         console.log(data)

    //         setName(data.name);
    //         setOverView(data.overview);
    //         setRating(data.rating);
    //         setImageURL(data.imageURL);
    //     }
      
    //     // call the function
    //     fetchData()
    //       // make sure to catch any error
    //       .catch(console.error);
    //   }, [])

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(e)
    //     const updatedMovie = {
    //         name : name,
    //         overview : overview,
    //         rating : rating,
    //         imageURL : imageURL
    //     }
    //     console.log(updatedMovie)
    //     axios.put("http://localhost:3002/movies/" + id , updatedMovie)
    //     props.editMovie()
    //     navigate("/")
    // };

    // const inputChange = (e) => {
    //     // console.log(e.target.name)
    //     // console.log(e.target.value)
    //     switch (e.target.name) {
    //         case "name":
    //             setName(e.target.value);
    //             break;
    //         case "overview":
    //             setOverView(e.target.value);
    //             break;
    //         case "rating":
    //             setRating(e.target.value);
    //             break;
    //         case "imageURL":
    //             setImageURL(e.target.value);
    //             break;
    //         default:
    //             break;
    //     }
    // }


    return (
        <h1> hELLO</h1>
        // <div className="container" style={
        //     {
        //         height: "100%",
        //         margin: "0 auto",
        //         verticalAlign: "middle",
        //         align: "center",
        //         horizontalAlign: "center"
        //     }
        // }>
        //     <form className="mt-5" onSubmit={handleFormSubmit}>
        //         <br />
        //         <br />
        //         <br />
        //         <br />
        //         <br />
        //         <br />
        //         <br />
        //         <br />
        //         <div className="row">
        //             <div className='col-lg-1'>
        //                 <Link
        //                     to={{ pathname: "/" }}
        //                     type="button"
        //                     className="btn btn-nd btn-info"
        //                     style={{ float: 'left' }}
        //                 >
        //                     Back
        //                 </Link>
        //             </div>
        //             <div className='col-lg-11'>
        //                 <input className="form-control" id="disabledInput" type="text" placeholder="EDIT The Form To UPDATE A Movie.." disabled />
        //             </div>
        //         </div>
        //         <div className="form-row">
        //             <div className="form-group col-md-10">
        //                 <label htmlFor="inputName">Name</label>
        //                 <input type="text"
        //                     className="form-control"
        //                     name="name"
        //                     value = {name} 
        //                     onChange = {inputChange} />
        //             </div>
        //             <div className="form-group col-md-2">
        //                 <label htmlFor="inputRating">Rating</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     name="rating"
        //                     value = {rating}
        //                     onChange = {inputChange} />
        //             </div>
        //         </div>
        //         <div className="form-row">
        //             <div className="form-group col-md-12">
        //                 <label htmlFor="inputImage">Image URL</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     name="imageURL"
        //                     value = {imageURL} 
        //                     onChange = {inputChange}/>
        //             </div>
        //         </div>
        //         <div className="form-row"> 
        //             <div className="form-group col-md-12">
        //                 <label htmlFor="overviewTextarea">Overview</label>
        //                 <textarea
        //                     className="form-control"
        //                     name="overview"
        //                     value = {overview}
        //                     onChange = {inputChange}
        //                     rows="5"></textarea>
        //             </div>
        //         </div>
        //         <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
        //     </form>
        // </div>
    )
}

export default EditRestaurant
