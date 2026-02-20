import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const Favorites = () => {
    const { favorites, clearFavorites } = useFavorites();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (favorites.length === 0) {
                setFavoriteMovies([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const fetchPromises = favorites.map(id =>
                    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`).then(res => res.json())
                );

                const results = await Promise.all(fetchPromises);

                // Filter out any failed requests or "False" responses
                const validMovies = results.filter(data => data.Response === 'True');
                setFavoriteMovies(validMovies);

            } catch (err) {
                setError('Failed to load favorite movies.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteMovies();
    }, [favorites]);

    if (loading) return <Loader />;
    if (error) return <ErrorCard message={error} />;

    return (
        <motion.div
            style={{ padding: '2rem 0' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
                    Your Favorites
                </h1>
                {favorites.length > 0 && (
                    <motion.button
                        className="btn btn-outline"
                        onClick={clearFavorites}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Clear All
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {favorites.length === 0 ? (
                    <motion.div
                        key="empty"
                        className="empty-state glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h3>No favorite movies added.</h3>
                        <p className="text-secondary" style={{ fontSize: '1.2rem' }}>Go to Home and click the heart icon to add some!</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        className="movie-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {favoriteMovies.map(movie => (
                            <motion.div
                                key={movie.imdbID}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <MovieCard movie={movie} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Favorites;
