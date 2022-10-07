import React from 'react'

import { useState, useEffect } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import axios from 'axios';


const EditRestaurant = (props) => {

    const [name, setName] = useState("Loading...")
    const [rate, setRate] = useState("Loading...")
    const [address, setAddress] = useState("Loading...")
    const [country, setCountry] = useState("Loading...")
    const [zipcode, setZipcode] = useState("Loading...")
    const [web, setWeb] = useState("Loading...")
    const [image, setImage] = useState("Loading...")
    const [description, setDescription] = useState("Loading...")
    const [menu, setMenu] = useState("Loading...")
    const [cardId, setCardId] = useState("Loading...")
    const [key, setKey] = useState("Loading...")

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {

            const baseUrl = "http://localhost:8000/restaurant/" + id;

            await axios.get(baseUrl)
                .then(response => {
                    const data = response.data.data
                    const key = response.data.documentId
                    setKey(key)
                    setCardId(data.id)
                    setName(data.name)
                    setRate(data.rate)
                    setCountry(data.country)
                    setDescription(data.description)
                    setAddress(data.location.address)
                    setZipcode(data.location.zipcode)
                    setWeb(data.location.web)
                    setImage(data.image)
                    setMenu(data.menu.toString())
                })
                .catch(error => {
                    navigate("/")
                })
        }
        fetchRestaurant();
    }, [id,navigate])



    const inputChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "rate":
                setRate(e.target.value);
                break;
            case "country":
                setCountry(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "address":
                setAddress(e.target.value);
                break;
            case "zipcode":
                setZipcode(e.target.value);
                break;
            case "web":
                setWeb(e.target.value);
                break;
            case "image":
                setImage(e.target.value);
                break;
            case "menu":
                setMenu(e.target.value);
                break;
            default:
                break;
        }
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let formMenu = []

        menu.trim().split(',').forEach(item => {
            formMenu.push(item.trim())
        })


        const updatedRestaurant = {
            name: name,
            country: country,
            description: description,
            image: image,
            rate: rate,
            id: cardId,
            menu: formMenu,
            location: {
                address: address,
                zipcode: zipcode,
                web: web,
            }
        }

        const baseUrl = `http://localhost:8000/editRestaurant/${key}`

        await axios.put(baseUrl, updatedRestaurant)
            .then(() => {
                props.editRestaurant();
                navigate("/")
            }).catch(error => {
                console.log(error)
            })

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
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={inputChange}
                            value={name}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRate">Rate</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rate"
                            value={rate}
                            onChange={inputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-8">
                        <label htmlFor="inputAddress">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={address}
                            onChange={inputChange}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputCountry">Counrty</label>
                        <input
                            type="text"
                            className="form-control"
                            name="country"
                            value={country}
                            onChange={inputChange}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZipCode">Zipcode</label>
                        <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            value={zipcode}
                            onChange={inputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputWebSite">Web Site</label>
                        <input
                            type="text"
                            className="form-control"
                            name="web"
                            value={web}
                            onChange={inputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="image"
                            value={image}
                            onChange={inputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputDescripiton">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="1"
                            value={description}
                            onChange={inputChange}
                        ></textarea>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputMenu">Menu</label>
                        <textarea
                            className="form-control"
                            name="menu"
                            rows="1"
                            value={menu}
                            onChange={inputChange}
                        ></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-success btn-block" value="Edit Restaurant" />
            </form>
        </div>
    )
}

export default EditRestaurant
