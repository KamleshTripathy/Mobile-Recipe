import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { FavoriteContext } from "../context/favoriteContext";
import { AuthContext } from "../context/authContext";
import { useDarkMode } from "../context/darkmodeContext";
import { CartContext } from "../context/cartContext";

const FoodDetails = ({ navigation }) => {
  const route = useRoute();
  const { recipe } = route.params;
  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);
  const { cartRecipes, addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { isDarkMode } = useDarkMode();

  const isFavorite = favoriteRecipes.some((item) => item.id === recipe.id);

  const isCart = cartRecipes.some((item) => item.id === recipe.id);

  const handleAddToFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(recipe);
    } else {
      addToFavorites(recipe);
    }
  };
  const handleAddToCart = () => {
    if (isCart) {
      navigation.navigate("Cart");
    } else {
      addToCart(recipe);
    }
  };
  const handleLoginRequired = () => {
    // Navigate to login screen or display login required message
    navigation.navigate("Login"); // Example navigation to Login screen
  };

  if (!recipe) return <Text style={styles.errorText}>Food not found</Text>;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode && styles.darkModeContainer,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, isDarkMode && styles.darkModeTitle]}>
          {recipe.title}
        </Text>
        <Text style={[styles.description, isDarkMode && styles.darkModeDesc]}>
          <Text style={[styles.label, isDarkMode && styles.darkModeLabel]}>
            Description:{" "}
          </Text>
          {recipe.description}
        </Text>
        <Text style={[styles.instruction, isDarkMode && styles.darkModeInst]}>
          <Text style={[styles.label, isDarkMode && styles.darkModeLabel]}>
            Instructions:{" "}
          </Text>
          {recipe.instruction}
        </Text>
        <Text style={[styles.time, isDarkMode && styles.darkModetime]}>
          <Text style={[styles.label, isDarkMode && styles.darkModeLabel]}>
            Time:{" "}
          </Text>
          {recipe.time}
        </Text>
        <Text style={[styles.servings, isDarkMode && styles.darkModeServe]}>
          <Text style={[styles.label, isDarkMode && styles.darkModeLabel]}>
            Servings:{" "}
          </Text>
          {recipe.servings}
        </Text>
        <Text style={[styles.price, isDarkMode && styles.darkModePrice]}>
          <Text style={[styles.label, isDarkMode && styles.darkModeLabel]}>
            Price:{" "}
          </Text>
          {recipe.price}
        </Text>
      </View>
      {isLoggedIn ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleAddToFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartButtonText}>
              {isCart ? "Go to Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleLoginRequired}
          >
            <Text style={styles.favoriteButtonText}>Login to Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
  servings: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  favoriteButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  darkModeTitle: {
    color: "#fff",
  },
  darkModeDesc: { color: "#fff" },
  darkModeInst: { color: "#fff" },
  darkModetime: { color: "#fff" },
  darkModeServe: { color: "#fff" },
  darkModeLabel: { color: "#fff" },
  darkModePrice: { color: "#fff" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cartButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FoodDetails;
