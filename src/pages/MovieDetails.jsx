import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';
import { BiArrowBack, BiHeart, BiSolidHeart } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
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
            className="movie-details-container"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div
                className="hero-backdrop"
                style={{ backgroundImage: `url(${posterUrl})` }}
            ></div>
            <div className="hero-overlay"></div>

            <div className="details-content-wrapper glass">
                <div className="top-bar">
                    <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
                        <BiArrowBack /> Back
                    </button>
                </div>

                <div className="details-grid">
                    <div className="details-poster-wrapper">
                        <motion.img
                            src={posterUrl}
                            alt={`${movie.Title} poster`}
                            className="details-poster"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        />
                    </div>

                    <motion.div
                        className="details-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h1 className="details-title">
                            {movie.Title} <span className="title-year">({movie.Year})</span>
                        </h1>

                        <div className="details-meta">
                            <span className="meta-badge">{movie.Rated}</span>
                            <span>{movie.Runtime}</span>
                            <span>{movie.Genre}</span>
                        </div>

                        <motion.button
                            className={`btn ${isFav ? 'btn-outline' : 'btn-primary'} fav-btn`}
                            onClick={handleFavoriteClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isFav ? 'remove' : 'add'}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    {isFav ? (
                                        <><BiSolidHeart size={22} color="#ff007f" /> Exclude from Favorites</>
                                    ) : (
                                        <><BiHeart size={22} /> Add to Favorites</>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>

                        <div className="details-section">
                            <h3>Plot</h3>
                            <p>{movie.Plot}</p>
                        </div>

                        <div className="details-section details-stats">
                            <p><strong>Director</strong> {movie.Director}</p>
                            <p><strong>Actors</strong> {movie.Actors}</p>
                            <p><strong>Language</strong> {movie.Language}</p>
                            <p><strong>Country</strong> {movie.Country}</p>
                            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                                <p><strong>Box Office</strong> {movie.BoxOffice}</p>
                            )}
                        </div>

                        {movie.Ratings && movie.Ratings.length > 0 && (
                            <div className="details-section">
                                <h3>Ratings</h3>
                                <div className="ratings-grid">
                                    {movie.Ratings.map((rating, index) => (
                                        <div key={index} className="rating-item">
                                            <span className="rating-value">{rating.Value}</span>
                                            <span className="rating-source">{rating.Source}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
