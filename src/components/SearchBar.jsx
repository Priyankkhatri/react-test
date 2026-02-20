import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { motion } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ onSearch, emptyQueryError }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');

    // Floating label states
    const [isQueryFocused, setIsQueryFocused] = useState(false);
    const [isYearFocused, setIsYearFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim(), type, year);
        }
    };

    return (
        <motion.div
            className="search-bar-container glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
            <form onSubmit={handleSubmit} className="search-form">

                <div className={`input-group search-input-group ${isQueryFocused || query ? 'focused' : ''}`}>
                    <BiSearch className="search-icon" />
                    <motion.label
                        className="floating-label"
                        animate={{
                            y: isQueryFocused || query ? -28 : 0,
                            scale: isQueryFocused || query ? 0.85 : 1,
                            opacity: isQueryFocused || query ? 1 : 0.6
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        Search movies, series...
                    </motion.label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsQueryFocused(true)}
                        onBlur={() => setIsQueryFocused(false)}
                        className={`search-input ${emptyQueryError ? 'input-error' : ''}`}
                        aria-label="Search query"
                    />
                </div>

                <div className="filters-group">
                    <div className="select-wrapper">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="filter-select"
                            aria-label="Filter by type"
                        >
                            <option value="">All Types</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </select>
                    </div>

                    <div className={`input-group year-input-group ${isYearFocused || year ? 'focused' : ''}`}>
                        <motion.label
                            className="floating-label"
                            animate={{
                                y: isYearFocused || year ? -28 : 0,
                                scale: isYearFocused || year ? 0.85 : 1,
                                opacity: isYearFocused || year ? 1 : 0.6
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            Year
                        </motion.label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onFocus={() => setIsYearFocused(true)}
                            onBlur={() => setIsYearFocused(false)}
                            className="filter-input year-input"
                            aria-label="Filter by year"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary search-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        Search
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default SearchBar;
