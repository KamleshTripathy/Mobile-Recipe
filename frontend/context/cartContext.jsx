/* import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";

// Create context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState({});
  const [cartRecipes, setCartRecipes] = useState([]);

  useEffect(() => {
    if (user && carts[user.id]) {
      setCartRecipes(carts[user.id]);
    } else {
      setCartRecipes([]);
    }
  }, [user]);

  const addToCart = (recipe) => {
    if (!user) return;

    setCarts((prevFavorites) => {
      const userFavorites = prevFavorites[user.id] || [];
      const updatedFavorites = [...userFavorites, recipe];
      return {
        ...prevFavorites,
        [user.id]: updatedFavorites,
      };
    });

    setCartRecipes((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFromCart = (recipe) => {
    if (!user) return;

    setCarts((prevFavorites) => {
      const userFavorites = prevFavorites[user.id] || [];
      const updatedFavorites = userFavorites.filter(
        (item) => item.id !== recipe.id
      );
      return {
        ...prevFavorites,
        [user.id]: updatedFavorites,
      };
    });

    setCartRecipes((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== recipe.id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartRecipes,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./authContext";

// Initial state
const initialState = {
  cartRecipes: [],
  totalAmount: 0,
};

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_ITEM = "INCREMENT_ITEM";
const DECREMENT_ITEM = "DECREMENT_ITEM";

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartRecipes: [...state.cartRecipes, { ...action.payload, quantity: 1 }],
        totalAmount: parseFloat(
          (Number(state.totalAmount) + Number(action.payload.price)).toFixed(2)
        ),
      };
    case REMOVE_FROM_CART:
      const updatedCart = state.cartRecipes.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cartRecipes: updatedCart,
        totalAmount: parseFloat(
          (
            Number(state.totalAmount) -
            Number(action.payload.price) * Number(action.payload.quantity)
          ).toFixed(2)
        ),
      };
    case INCREMENT_ITEM:
      return {
        ...state,
        cartRecipes: state.cartRecipes.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalAmount: parseFloat(
          (Number(state.totalAmount) + Number(action.payload.price)).toFixed(2)
        ),
      };
    case DECREMENT_ITEM:
      // Find the item in the cart
      const itemToDecrement = state.cartRecipes.find(
        (item) => item.id === action.payload.id
      );

      if (!itemToDecrement || itemToDecrement.quantity <= 1) {
        // If item not found or quantity is already 1, return state unchanged
        return state;
      }

      // Calculate new quantity and total amount
      const updatedQuantity = itemToDecrement.quantity - 1;
      const updatedPrice = itemToDecrement.price;

      const updatedRecipes = state.cartRecipes.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: updatedQuantity,
            }
          : item
      );

      const updatedTotalAmount = parseFloat(
        (Number(state.totalAmount) - Number(updatedPrice)).toFixed(2)
      );

      return {
        ...state,
        cartRecipes: updatedRecipes,
        totalAmount: updatedTotalAmount,
      };
    default:
      return state;
  }
};

// Create context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState({});
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (user && carts[user.id]) {
      dispatch({ type: "SET_CART_RECIPES", payload: carts[user.id] });
    } else {
      dispatch({ type: "SET_CART_RECIPES", payload: [] });
    }
  }, [user]);

  const addToCart = (recipe) => {
    if (!user) return;

    setCarts((prevCarts) => {
      const userCart = prevCarts[user.id] || [];
      const updatedCart = [...userCart, recipe];
      return {
        ...prevCarts,
        [user.id]: updatedCart,
      };
    });

    dispatch({ type: ADD_TO_CART, payload: recipe });
  };

  const removeFromCart = (recipe) => {
    if (!user) return;

    setCarts((prevCarts) => {
      const userCart = prevCarts[user.id] || [];
      const updatedCart = userCart.filter((item) => item.id !== recipe.id);
      return {
        ...prevCarts,
        [user.id]: updatedCart,
      };
    });

    dispatch({ type: REMOVE_FROM_CART, payload: recipe });
  };

  const incrementItem = (recipe) => {
    dispatch({ type: INCREMENT_ITEM, payload: recipe });
  };

  const decrementItem = (recipe) => {
    dispatch({ type: DECREMENT_ITEM, payload: recipe });
  };

  return (
    <CartContext.Provider
      value={{
        cartRecipes: state.cartRecipes,
        totalAmount: state.totalAmount,
        cartCount: state.cartRecipes.reduce(
          (count, item) => count + item.quantity,
          0
        ),
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
