import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <div className="container text-center d-flex justify-content-center flex-column align-items-center" style={{ height: "80vh" }}>
            <h1 className="my-4">Welcome to the Marvel Character Database!</h1>
            <Link to="/characters" className="btn btn-primary btn-lg w-50">
                View Character List
            </Link>
        </div>
    )
}
export default HomePage;