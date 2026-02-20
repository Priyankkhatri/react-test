import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { BiHeart, BiSolidHeart, BiInfoCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const navigate = useNavigate();

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

    return (
        <motion.div
            className="movie-card glass"
            whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(229, 9, 20, 0.2)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={handleDetailsClick}
            title={Title}
        >
            <div className="card-image-wrapper">
                <img src={posterUrl} alt={`${Title} poster`} className="card-image" loading="lazy" />
                <span className="card-type-badge">{Type}</span>
            </div>

            <div className="card-content">
                <h3 className="card-title">{Title}</h3>
                <p className="card-year">{Year}</p>

                <div className="card-actions">
                    <button
                        className="btn btn-outline"
                        onClick={handleDetailsClick}
                        aria-label={`View details for ${Title}`}
                    >
                        <BiInfoCircle /> Details
                    </button>

                    <button
                        className={`btn-icon ${isFav ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        style={{ fontSize: '1.5rem' }}
                    >
                        {isFav ? <BiSolidHeart /> : <BiHeart />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
