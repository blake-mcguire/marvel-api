import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className='mt-3-flex justify-content-between bg-dark'>
            <ul className='d-flex justify-content-around flex-row w-100 p-4'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/characters">Characters</Link>
                </li>
                <li>
                    <Link to="/comics">Comics</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;