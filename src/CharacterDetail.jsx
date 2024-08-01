import React, {useState, useEffect} from "react"
import axios from "axios";
import CryptoJS from 'crypto-js';
import styles from './Modal.module.css';


const CharacterDetails = ({characterID, onClose}) => {
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true);
    
    const fetchCharacterDetails = async () => {
        const publicKey = '31508daca75f0eeceac0e574e3778331';
        const privateKey = '5e378aed94f3e936f0449dbbd2fd992309f9f443';
        const ts = '1';
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
        const url=`https://gateway.marvel.com/v1/public/characters/${characterID}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    

    try{
        const response = await axios.get(url);
        setCharacter(response.data.data.results[0]);
        setLoading(false);

    } catch {
        console.log("Error fetching details for character!", error);
        setLoading(false)
    }
};


    useEffect(() => {
        fetchCharacterDetails();
    }, [characterID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!character) {
        return <div>Character Not Found!</div>;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalcontent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h1>{character.name}</h1>
                <p>{character.description}</p>
                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            </div>
        </div>
    );
};
export default CharacterDetails;