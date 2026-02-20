import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import About from './pages/About';

// Animated Route Wrapper
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/movie/:id" element={<PageTransition><MovieDetails /></PageTransition>} />
                <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="*" element={<PageTransition><Home /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

// Extracted transition wrapper component
const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

function App() {
    return (
        <Router>
            <div className="app-background"></div>
            <div className="film-grain"></div>
            <Navbar />
            <main className="main-content container">
                <AnimatedRoutes />
            </main>
        </Router>
    );
}

export default App;
