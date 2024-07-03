import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";

// Create context
export const FavoriteContext = createContext();

// Provider component
export const FavoriteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (user && favorites[user.id]) {
      setFavoriteRecipes(favorites[user.id]);
    } else {
      setFavoriteRecipes([]);
    }
  }, [user]);

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const addToFavorites = (recipe) => {
    if (!user) return;

    setFavorites((prevFavorites) => {
      const userFavorites = prevFavorites[user.id] || [];
      const updatedFavorites = [...userFavorites, recipe];
      return {
        ...prevFavorites,
        [user.id]: updatedFavorites,
      };
    });

    setFavoriteRecipes((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFromFavorites = (recipe) => {
    if (!user) return;

    setFavorites((prevFavorites) => {
      const userFavorites = prevFavorites[user.id] || [];
      const updatedFavorites = userFavorites.filter(
        (item) => item.id !== recipe.id
      );
      return {
        ...prevFavorites,
        [user.id]: updatedFavorites,
      };
    });

    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== recipe.id)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteRecipes,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
