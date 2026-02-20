import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { BiMoviePlay, BiHeart } from 'react-icons/bi';
import './Navbar.css'; // Let's use CSS modules or specific CSS for Navbar if needed, or inline. I'll add to styles.css or create it.

const Navbar = () => {
    const { favorites } = useFavorites();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <BiMoviePlay className="logo-icon" />
                    <span>MovieExplorer</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/favorites" className={`nav-link ${isActive('/favorites')}`}>
                        Favorites
                        {favorites.length > 0 && (
                            <span className="badge">{favorites.length}</span>
                        )}
                    </Link>
                    <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
