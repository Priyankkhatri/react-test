import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';
import { BiArrowBack, BiHeart, BiSolidHeart } from 'react-icons/bi';
import { motion } from 'framer-motion';
import './MovieDetails.css';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isFav = isFavorite(id);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
                const data = await response.json();

                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error || 'Movie not found!');
                }
            } catch (err) {
                setError('Failed to fetch movie details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

    const handleFavoriteClick = () => {
        if (isFav) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorCard message={error} />;
    if (!movie) return null;

    const posterUrl = movie.Poster !== 'N/A' && movie.Poster ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

    return (
        <motion.div
            className="movie-details-container container glass"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
                <BiArrowBack /> Back
            </button>

            <div className="details-grid">
                <div className="details-poster-wrapper">
                    <img src={posterUrl} alt={`${movie.Title} poster`} className="details-poster" />
                </div>

                <div className="details-content">
                    <h1 className="details-title">{movie.Title} <span className="text-secondary">({movie.Year})</span></h1>

                    <div className="details-meta">
                        <span className="badge">{movie.Rated}</span>
                        <span>{movie.Runtime}</span>
                        <span>{movie.Genre}</span>
                    </div>

                    <button
                        className={`btn ${isFav ? 'btn-outline' : 'btn-primary'} fav-btn`}
                        onClick={handleFavoriteClick}
                    >
                        {isFav ? (
                            <><BiSolidHeart size={20} /> Remove from Favorites</>
                        ) : (
                            <><BiHeart size={20} /> Add to Favorites</>
                        )}
                    </button>

                    <div className="details-section">
                        <h3>Plot</h3>
                        <p>{movie.Plot}</p>
                    </div>

                    <div className="details-stats">
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Actors:</strong> {movie.Actors}</p>
                        <p><strong>Language:</strong> {movie.Language}</p>
                        <p><strong>Country:</strong> {movie.Country}</p>
                        {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                            <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
                        )}
                    </div>

                    {movie.Ratings && movie.Ratings.length > 0 && (
                        <div className="details-section">
                            <h3>Ratings</h3>
                            <ul className="ratings-list">
                                {movie.Ratings.map((rating, index) => (
                                    <li key={index} className="rating-item">
                                        <span className="rating-source">{rating.Source}</span>
                                        <span className="rating-value">{rating.Value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
