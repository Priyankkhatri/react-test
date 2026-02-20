import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('batman');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim(), type, year);
        }
    };

    return (
        <div className="search-bar-container glass">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="input-group search-input-group">
                    <BiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search movies, series..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                        aria-label="Search query"
                    />
                </div>

                <div className="filters-group">
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

                    <input
                        type="number"
                        placeholder="Year (e.g. 2023)"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="filter-input year-input"
                        aria-label="Filter by year"
                    />

                    <button type="submit" className="btn btn-primary search-btn">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
