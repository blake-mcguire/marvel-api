import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import thanosGif from './thanos.gif';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCharacters = async () => {
        const publicKey = '31508daca75f0eeceac0e574e3778331';
        const privateKey = '5e378aed94f3e936f0449dbbd2fd992309f9f443';
        const ts = '1';
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        try {
            const response = await axios.get(url);
            setCharacters(response.data.data.results);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching characters!", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    if (loading) {
        return <div className="container-fluid d-flex justify-content-center text-center align-items-center"style={{ height: "100vh", backgroundImage: `url(${thanosGif})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <h1 style={{fontFamily: 'Impact', fontSize: '5vw', color: 'white', textShadow: '6px 8px 4px black'}} >Loading...</h1>
            </div>;
    }

    return (
        <div className="container">
            <h1 className="my-4">Character List</h1>
            <div className="row">
                {characters.map(character => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={character.id}>
                        <div className="card h-100">
                            <Link to={`/character/${character.id}`}>
                                <img className="card-img-top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                            </Link>
                            <div className="card-body">
                                <h4 className="card-title">
                                    <Link to={`/character/${character.id}`}>{character.name}</Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterList;