import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '2rem 0' }}
        >
            <div className="glass" style={{ padding: '3rem', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>About MovieExplorer</h1>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Welcome to MovieExplorer, your ultimate cinematic companion. Discover your favorite movies, series, and episodes with our sleek, modern interface.
                </p>
                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Features</h2>
                <ul style={{ listStylePosition: 'inside', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                    <li>Search across the extensive OMDb database.</li>
                    <li>Filter by type (Movie, Series, Episode) and release year.</li>
                    <li>Save items to your personal Favorites for quick access.</li>
                    <li>View in-depth information including plot summaries, cast, and ratings.</li>
                </ul>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Powered by React, Vite, and the OMDb API.
                </p>
            </div>
        </motion.div>
    );
};

export default About;
