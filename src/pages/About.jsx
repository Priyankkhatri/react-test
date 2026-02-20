import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: '3rem 0', display: 'flex', justifyContent: 'center' }}
        >
            <div className="glass" style={{
                padding: '4rem',
                borderRadius: '24px',
                maxWidth: '800px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}>
                <h1 style={{
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                    fontSize: '3rem',
                    fontWeight: '900',
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    About MovieExplorer
                </h1>
                <p style={{ marginBottom: '2.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                    Welcome to MovieExplorer, your ultimate cinematic companion. Discover your favorite movies, series, and episodes with our sleek, immersive, and premium interface.
                </p>

                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--accent-2)' }}>Key Features</h2>
                <ul style={{
                    listStylePosition: 'inside',
                    marginBottom: '2.5rem',
                    lineHeight: '2',
                    fontSize: '1.15rem',
                    color: 'var(--text-muted)'
                }}>
                    <li>Search across the extensive OMDb database with zero delay.</li>
                    <li>Filter by type (Movie, Series, Episode) and precise release year.</li>
                    <li>Save items to your personal Favorites with dynamic reactive state.</li>
                    <li>View in-depth immersive information including plots, cast, and high-fidelity ratings.</li>
                </ul>

                <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Transforming interfaces into Dribbble-level experiences. Powered by React, Vite, Framer Motion, and the precise OMDb API.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
