/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoritePost) => {},
    removeFavorite: (postId) => {},
    itemIsFavorite: (postId) => {}
});

export function FavoritesContextProvider(props)
{
    const [userFavorites, setUserFavorites] = useState([]);
    
    function addFavoritesHandler(favoritePost) {
        setUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(favoritePost);
        });
    }

    function removeFavoritesHandler(postId) {
        setUserFavorites(prevUserFavorites => {
            return prevUserFavorites.filter(post => post.id !== postId);
        });
    }

    function itemIsFavoritesHandler(postId) {
        return userFavorites.some((post) => {
            post.id === postId
        });
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoritesHandler,
        removeFavorite: removeFavoritesHandler,
        itemIsFavorite: itemIsFavoritesHandler
    };

    return(
        <FavoritesContext.Provider value={context}>
            {props.children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;