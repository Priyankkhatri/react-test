import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Vibrant } from 'node-vibrant/browser';
import './Home.css';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [emptyQueryError, setEmptyQueryError] = useState(false);
    const [dynamicTheme, setDynamicTheme] = useState(null); // Stores extracted gradient colors

    const abortControllerRef = useRef(null);

    const fetchMovies = async (searchQuery, typeFilter = '', yearFilter = '') => {
        if (!searchQuery) {
            setEmptyQueryError(true);
            setTimeout(() => setEmptyQueryError(false), 800);
            return;
        }

        setHasSearched(true);

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

                // Extract dominant color from the first movie poster
                const firstPoster = data.Search[0]?.Poster;
                if (firstPoster && firstPoster !== 'N/A') {
                    try {
                        const palette = await Vibrant.from(firstPoster).getPalette();
                        const color1 = palette.Vibrant ? palette.Vibrant.hex : '#1e293b';
                        const color2 = palette.DarkVibrant ? palette.DarkVibrant.hex : '#111827';
                        setDynamicTheme(`radial-gradient(circle at 50% 10%, ${color1}40, var(--bg-0) 60%, ${color2}60 100%)`);
                    } catch (colorErr) {
                        console.warn('Color extraction failed, using default theme.', colorErr);
                        setDynamicTheme(null);
                    }
                } else {
                    setDynamicTheme(null);
                }
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

    // Cleanup abort controller on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleSearch = (query, type, year) => {
        fetchMovies(query, type, year);
    };

    const containerStyle = {
        '--dynamic-bg': dynamicTheme || 'radial-gradient(circle at 50% 10%, var(--bg-1), var(--bg-0) 60%, var(--bg-2) 100%)'
    };

    return (
        <div
            className={`home-page-container ${!hasSearched ? 'landing-mode' : 'results-mode'}`}
            style={containerStyle}
        >
            <div className="dynamic-background-layer" />

            <motion.div
                className="home-search-section"
                layout
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                <AnimatePresence>
                    {!hasSearched && (
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, height: 0, margin: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <h1 className="hero-heading">
                                Discover Movies Like <span>Never Before</span>
                            </h1>
                            <p className="hero-subheading">
                                Search millions of movies, series and episodes instantly in stunning detail.
                            </p>

                            <div className="hero-bg-glows">
                                <div className="glow glow-1"></div>
                                <div className="glow glow-2"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="search-bar-wrapper"
                    animate={emptyQueryError ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <SearchBar onSearch={handleSearch} emptyQueryError={emptyQueryError} />

                    <AnimatePresence>
                        {emptyQueryError && (
                            <motion.p
                                className="search-error-text"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                Please enter a movie name to search.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {hasSearched && (
                    <motion.div
                        className="home-results-section"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    >
                        {loading && <Loader />}

                        {error && !loading && <ErrorCard message={error === "Movie not found!" ? "No movies found. Try another search." : error} />}

                        {!loading && !error && movies.length === 0 && (
                            <div className="empty-state glass">
                                <h3>No results found</h3>
                                <p className="text-secondary">Try adjusting your search or filters.</p>
                            </div>
                        )}

                        {!loading && !error && movies.length > 0 && (
                            <motion.div
                                className="movie-grid"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.08 } }
                                }}
                            >
                                {movies.map((movie) => (
                                    <motion.div
                                        key={movie.imdbID}
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                    >
                                        <MovieCard movie={movie} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
