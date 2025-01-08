// Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = ({ initialMovies = [], onMoviesChange }) => {
    const [movies, setMovies] = useState(initialMovies);
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [filter, setFilter] = useState(0);
    const [sort, setSort] = useState('none'); 
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        onMoviesChange(movies); 
    }, [movies, onMoviesChange]);

    const addOrUpdateMovie = () => {
        if (editingIndex !== null) {
            const updatedMovies = movies.map((movie, index) => 
                index === editingIndex ? { title, rating, comment } : movie
            );
            setMovies(updatedMovies);
            setEditingIndex(null);
        } else {
            const newMovies = [...movies, { title, rating, comment }];
            setMovies(newMovies);
        }
        setTitle('');
        setRating(1);
        setComment('');
    };

    const deleteMovie = (index) => {
        const newMovies = movies.filter((_, i) => i !== index);
        setMovies(newMovies);
    };

    const startEditing = (index) => {
        const movie = movies[index];
        setTitle(movie.title);
        setRating(movie.rating);
        setComment(movie.comment);
        setEditingIndex(index);
    };

 
    const filteredMovies = filter > 0 
        ? movies.filter(movie => movie.rating >= filter) 
        : movies;

    const sortedMovies = sort === 'asc' 
        ? filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
        : sort === 'desc'
        ? filteredMovies.sort((a, b) => b.title.localeCompare(a.title)) 
        : filteredMovies;

    return (
        <div className="home">
            <h1> 🎥 🎞️ My Movie List 🍿 🎬</h1>
            <form onSubmit={(e) => { e.preventDefault(); addOrUpdateMovie(); }}>
                <input
                    type="text"
                    placeholder="Movie Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                    ))}
                </select>
                <textarea
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={200}
                />
                <button>{editingIndex !== null ? 'Update Movie' : 'Add Movie'}</button>
            </form>

            <div className="filter">
                <label htmlFor="filter">Filter by Rating:</label>
                <select id="filter" value={filter} onChange={(e) => setFilter(Number(e.target.value))}>
                    <option value={0}>All Ratings</option>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''} & Up</option>
                    ))}
                </select>
            </div>

            <div className="sort">
                <label htmlFor="sort">Sort by Title:</label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="none">None</option>
                    <option value="asc">Ascending (A-Z)</option>
                    <option value="desc">Descending (Z-A)</option>
                </select>
            </div>

            <ul>
                {sortedMovies.map((movie, index) => (
                    <li key={index} className="movie-item">
                        <h2>{movie.title}</h2>
                        <p>Rating: {'⭐'.repeat(movie.rating)}</p>
                        {movie.comment && <p>Comment: {movie.comment}</p>}
                        <button onClick={() => startEditing(index)}>Edit</button>
                        <button onClick={() => deleteMovie(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/wishlist">
                <button>Go to Wishlist</button>
            </Link> 
        </div>
    );
};

export default Home;

