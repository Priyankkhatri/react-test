import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { BiMoviePlay } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const { favorites } = useFavorites();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <motion.nav
            className="navbar glass"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <BiMoviePlay className="logo-icon" />
                    <span>MovieExplorer</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>
                        Home
                    </Link>
                    <Link to="/favorites" className={`nav-link ${isActive('/favorites')}`}>
                        Favorites
                        <AnimatePresence>
                            {favorites.length > 0 && (
                                <motion.span
                                    className="badge"
                                    key={favorites.length}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1, rotate: [0, -10, 10, -10, 0] }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.4 }}
                                >
                                    {favorites.length}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    <Link to="/about" className={`nav-link ${isActive('/about')}`}>
                        About
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
