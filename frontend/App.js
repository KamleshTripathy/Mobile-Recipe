import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./navigator/AppNavigator";
import { AuthProvider } from "./context/authContext";
import { FavoriteProvider } from "./context/favoriteContext";
import { DarkModeProvider } from "./context/darkmodeContext";
import { CartProvider } from "./context/cartContext";

const App = () => {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <CartProvider>
          <DarkModeProvider>
            <AppNavigator />
          </DarkModeProvider>
        </CartProvider>
      </FavoriteProvider>
    </AuthProvider>
  );
};

export default App;
