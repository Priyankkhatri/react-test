import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import About from './pages/About';

function App() {
    return (
        <Router>
            <Navbar />
            <main className="main-content container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
