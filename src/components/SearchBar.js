import { Link } from "react-router-dom";


const SearchBar = (props) => {


    const handleFormSubmit = (event) => {
        event.preventDefault()
    }



    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-row mb-5">
                <div className="col-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search a restaurant"
                        onChange={props.searchProp}
                    />
                </div>
                <div className="col-2">
                    <Link
                        to={{ pathname: "/addRestaurant" }}
                        type="button"
                        className="btn btn-nd btn-danger"
                        style={{ float: 'right' }}
                    >
                        Add Restaurant
                    </Link>
                </div>
            </div>
        </form>
    );
}



export default SearchBar;