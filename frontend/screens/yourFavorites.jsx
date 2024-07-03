import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FavoriteContext } from "../context/favoriteContext";
import { useDarkMode } from "../context/darkmodeContext";

const FavoriteRecipesScreen = ({ navigation }) => {
  const { favoriteRecipes } = useContext(FavoriteContext);
  const { isDarkMode } = useDarkMode();

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => navigation.navigate("FoodDetails", { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text
        style={[styles.recipeTitle, isDarkMode && styles.darkModeRecipeTitle]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkModetitle]}>
        Your Favorite Recipes
      </Text>
      <FlatList
        data={favoriteRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recipeContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  recipeTitle: {
    fontSize: 18,
    color: "#333",
  },
  darkModeRecipeTitle: {
    color: "#fff",
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  darkModetitle: {
    color: "#fff",
  },
});

export default FavoriteRecipesScreen;
