import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { BiHeart, BiSolidHeart, BiInfoCircle } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const navigate = useNavigate();
    const cardRef = useRef(null);

    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const { imdbID, Title, Year, Poster, Type } = movie;
    const isFav = isFavorite(imdbID);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (isFav) {
            removeFavorite(imdbID);
        } else {
            addFavorite(imdbID);
        }
    };

    const handleDetailsClick = () => {
        navigate(`/movie/${imdbID}`);
    };

    const posterUrl = Poster !== 'N/A' && Poster ? Poster : 'https://via.placeholder.com/300x450?text=No+Image';

    // 3D calculation
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        // Check for prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Moderate rotation degree to not break immersion
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            className="movie-card-wrapper"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="movie-card glass"
                onClick={handleDetailsClick}
                title={Title}
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="card-image-wrapper">
                    <img src={posterUrl} alt={`${Title} poster`} className="card-image" loading="lazy" />
                    <span className="card-type-badge">{Type}</span>
                    <div className="card-reflection"></div>
                </div>

                <div className="card-content">
                    <h3 className="card-title">{Title}</h3>
                    <p className="card-year">{Year}</p>

                    <div className="card-actions">
                        <button
                            className="btn btn-outline details-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDetailsClick();
                            }}
                            aria-label={`View details for ${Title}`}
                        >
                            <BiInfoCircle /> Details
                        </button>

                        <motion.button
                            className={`btn-icon fav-action-btn ${isFav ? 'active' : ''}`}
                            onClick={handleFavoriteClick}
                            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isFav ? 'filled' : 'outline'}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isFav ? <BiSolidHeart className="heart-filled" /> : <BiHeart />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MovieCard;
