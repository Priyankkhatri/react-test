import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';

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
        <div style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text-primary)' }}>Your Favorites</h1>
                {favorites.length > 0 && (
                    <button className="btn btn-outline" onClick={clearFavorites}>
                        Clear All
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <h3>No favorite movies added.</h3>
                    <p className="text-secondary">Go to Home and click the heart icon to add some!</p>
                </div>
            ) : (
                <div className="movie-grid">
                    {favoriteMovies.map(movie => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
