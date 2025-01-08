// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Wishlist from './components/Wishlist.jsx';

const App = () => {
    const [movies, setMovies] = useState(() => {
        const savedMovies = localStorage.getItem('movies');
        return savedMovies ? JSON.parse(savedMovies) : [];
    });

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [movies]);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={<Home initialMovies={movies} onMoviesChange={setMovies} />} 
                />
                <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
        </Router>
    );
};

export default App;
