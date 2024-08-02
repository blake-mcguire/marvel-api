import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ComicList = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComics = async () => {
        const publicKey = '31508daca75f0eeceac0e574e3778331';
        const privateKey = '5e378aed94f3e936f0449dbbd2fd992309f9f443';
        const ts = '1';
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
        const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        try {
            const response = await axios.get(url);
            console.log(response.data.data.results); 
            setComics(response.data.data.results);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching comics!", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComics();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">Comic List</h1>
            <div className="row">
                {comics.map(comic => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={comic.id}>
                        <div className="card h-100">
                            <Link to={`/comic/${comic.id}`}>
                                <img className="card-img-top" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} />
                            </Link>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <Link to={`/comic/${comic.id}`}>{comic.title}</Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComicList;