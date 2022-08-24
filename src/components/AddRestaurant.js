import React from 'react'

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import serialize from 'form-serialize';




const AddRestaurant = (props) => {

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formRestaurant = serialize(e.target, { hash: true });
        
        let menu = []
        
        formRestaurant.menu.trim().split(',').forEach(item => {
            menu.push(item.trim())
        } )

        formRestaurant.menu = menu

        const newRestaurant = {
            name: formRestaurant.name,
            country: formRestaurant.country,
            description: formRestaurant.description,
            image: formRestaurant.image,
            rate : formRestaurant.rate,
            menu : formRestaurant.menu ,
            location: {
                address: formRestaurant.address,
                zipcode: formRestaurant.zipcode,
                web: formRestaurant.web,
            }
        }

        props.onAddRestaurant(newRestaurant);
        navigate("/")
    };

    return (
        <div className="container" style={
            {
                height: "100%",
                margin: "0 auto",
                verticalAlign: "middle",
                align: "center",
                horizontalAlign: "center"
            }
        }>

            <form className="mt-5" onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className='col-lg-1'>
                        <Link
                            to={{ pathname: "/" }}
                            type="button"
                            className="btn btn-nd btn-info"
                            style={{ float: 'left' }}
                        >
                            Back
                        </Link>
                    </div>
                    <div className='col-lg-11'>
                        <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Add A Restaurant.." disabled />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input type="text"
                            className="form-control"
                            name="name" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRate">Rate</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rate"
                            placeholder='Exp : 9.7' />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text"
                            className="form-control"
                            name="address" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputCountry">Counrty</label>
                        <input
                            type="text"
                            className="form-control"
                            name="country" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZipCode">Zipcode</label>
                        <input
                            type="text"
                            className="form-control"
                            name="zipcode" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputWebSite">Web Site</label>
                        <input
                            type="text"
                            className="form-control"
                            name="web" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="image" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputDescripiton">Description</label>
                        <textarea
                            className="form-control"
                            name="description" rows="1"></textarea>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputMenu">Manu</label>
                        <textarea
                            className="form-control"
                            name="menu" rows="1"
                            placeholder="Exp :
                            Fish,Soup , 
                            "
                        ></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block" value="Add Restaurant" />
            </form>
        </div>
    )
}

export default AddRestaurant
