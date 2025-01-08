
import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
    return (
        <div className="wishlist">
            <h1>My Wishlist 🎬</h1>
           
            <Link to="/">
                <button className="go-home-button">Go to Home</button>
            </Link>
        </div>
    );
};

export default Wishlist;
