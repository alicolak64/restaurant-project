import React from "react";

import { useState, useEffect } from 'react';


import { Link } from "react-router-dom";


const RestaurantList = (props) => {

    const trucateOverview = (string, maxLength) => {

        if (!string) {
            return null;
        } else if (string.length > maxLength) {
            return string.substring(0, maxLength) + "...";
        } else {
            return string;
        }

    }

    return (

        <div className="row">


            {props.restaurants.map((restaurant, index) => (
                <div className="col-lg-4" key={index}>
                    <div className="card mb-4 shadow-sm">
                        <a href={restaurant.location.web}>
                            <img
                                src={restaurant.image}
                                className="card-img-top"
                                alt={restaurant.name}
                                onClick={() => props.onRestaurantSelect(restaurant)}
                            />
                        </a>
                        <div className="card-body">
                            <h4 className="card-title">
                                {restaurant.name}
                            </h4>
                            <p className="card-text">
                                {trucateOverview(restaurant.description, 200)}
                            </p>


                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-primary"> Address :   {restaurant.location.address} </p>
                            </div>



                            <div>
                                <h5 className="text-warning mx-auto" style = {{width: "70px"}} > Menu </h5>
                                <ul className="list-group">
                                    {restaurant.menu.map((menuItem, index) => (
                                        <div key={index}>
                                            <div >
                                                <li className="list-group-item">{menuItem}</li>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="button" onClick={
                                    (event) => {
                                        props.deleteRestaurantProp(restaurant);
                                    }
                                } className="btn btn-md btn-outline-danger">
                                    Delete
                                </button>
                                <Link
                                    type="button"
                                    className="btn btn-md btn-outline-primary"
                                    to={`editRestaurant/${restaurant.id}`}>
                                    Edit
                                </Link>
                                <h2>
                                    <span className="badge bg-info">
                                        {restaurant.rate % 1 === 0 ? restaurant.rate + ".0" : restaurant.rate}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )

}

export default RestaurantList;