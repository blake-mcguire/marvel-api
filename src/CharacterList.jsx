import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const publicKey = '31508daca75f0eeceac0e574e3778331';
    const privateKey = '5e378aed94f3e936f0449dbbd2fd992309f9f443';
    const ts = '1';
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const fetchCharacters = async () => {
        try {
            const cachedData = localStorage.getItem('characters');
            if (cachedData) {
                setCharacters(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            const response = await axios.get(url);
            const data = response.data.data.results;
            setCharacters(data);
            localStorage.setItem('characters', JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            console.log("Error fetching character list:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    if (loading) {
        return <div className='container-fluid d-flex justify-content-center'>Loading...</div>;
    }

    return (
        <div className='container-fluid justify-content-center d-flex flex-wrap bg-dark'>
            {characters.map(character => (
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 m-5 text-center bg-light p-5' key={character.id}>
                    <h2>{character.name}</h2>
                    <img className='img-fluid w-100 h-100'src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} onClick={() => onCharacterSelect(character.id)}/>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;