import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const localData = localStorage.getItem('favorites');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error('Error parsing favorites from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites to localStorage:', error);
        }
    }, [favorites]);

    const addFavorite = (id) => {
        if (!favorites.includes(id)) {
            setFavorites([...favorites, id]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(favId => favId !== id));
    };

    const isFavorite = (id) => favorites.includes(id);

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
