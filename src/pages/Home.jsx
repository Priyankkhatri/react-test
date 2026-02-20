import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const abortControllerRef = useRef(null);

    const fetchMovies = async (searchQuery, typeFilter = '', yearFilter = '') => {
        // Cancel previous request if any
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);
        setMovies([]);

        try {
            const url = new URL('https://www.omdbapi.com/');
            url.searchParams.append('apikey', API_KEY);
            url.searchParams.append('s', searchQuery);

            if (typeFilter) {
                url.searchParams.append('type', typeFilter);
            }
            if (yearFilter) {
                url.searchParams.append('y', yearFilter);
            }

            const response = await fetch(url.toString(), {
                signal: abortControllerRef.current.signal
            });

            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setError(data.Error);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError('Failed to fetch data. Please try again.');
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    // Default search on mount
    useEffect(() => {
        fetchMovies('batman');

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleSearch = (query, type, year) => {
        fetchMovies(query, type, year);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />

            {loading && <Loader />}

            {error && <ErrorCard message={error} />}

            {!loading && !error && movies.length === 0 && (
                <div className="empty-state">
                    <h3>No results found</h3>
                    <p className="text-secondary">Try adjusting your search or filters.</p>
                </div>
            )}

            {movies.length > 0 && (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
