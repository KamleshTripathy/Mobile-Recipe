import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { FavoriteContext } from "../context/favoriteContext";
import { AuthContext } from "../context/authContext";
import CategoryModal from "../components/modal";
import CustomTextInput from "../components/customTextinput";

import { useDarkMode } from "../context/darkmodeContext";

const windowWidth = Dimensions.get("window").width;

const ShowMoreScreen = ({ route, navigation }) => {
  const { recipes, categories } = route.params;
  const { favoriteRecipes, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { isDarkMode } = useDarkMode();
  const [isSingleRow, setIsSingleRow] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [allRecipes, setAllrecipe] = useState(recipes);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleRecipes, setVisibleRecipes] = useState(recipes);

  const toggleDisplayMode = () => {
    setIsSingleRow(!isSingleRow);
  };

  const handleFavoriteToggle = (recipe) => {
    if (isLoggedIn) {
      if (favoriteRecipes.some((item) => item.id === recipe.id)) {
        removeFromFavorites(recipe);
      } else {
        addToFavorites(recipe);
      }
    } else {
      navigation.navigate("Login");
    }
  };

  const handleSearch = (text) => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(text.toLowerCase()) ||
        recipe.category.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setAllrecipe(filtered);
  };

  const renderRecipeCard = (recipe, index) => {
    const cardWidth = isSingleRow ? windowWidth - 40 : (windowWidth - 60) / 2;
    const isFavorite = favoriteRecipes.some((item) => item.id === recipe.id);

    return (
      <TouchableOpacity
        key={recipe.id}
        style={[
          styles.card,
          { width: cardWidth },
          isDarkMode && styles.darkmodeCard,
        ]}
        onPress={() => navigation.navigate("FoodDetails", { recipe })}
      >
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.recipeDetails}>
          <Text
            style={[styles.recipeTitle, isDarkMode && styles.darkModeRTitle]}
          >
            {recipe.title}
          </Text>
          <Text
            style={[
              styles.recipeDescription,
              isDarkMode && styles.darkModeRDesc,
            ]}
          >
            {recipe.description}
          </Text>
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => handleFavoriteToggle(recipe)}
          >
            <FontAwesome
              name="heart"
              size={24}
              color={isFavorite ? "red" : "grey"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  useEffect(() => {
    let filtered = recipes;

    if (selectedCategory) {
      filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory.title
      );
    }

    setAllrecipe(filtered);
  }, [recipes, selectedCategory]);

  const clearFilter = () => {
    setSelectedCategory(null);
    setModalVisible(false);
    setVisibleRecipes(recipes); // Reset to all recipes
  };

  const filterButtonText = selectedCategory ? "Clear" : "Categories";

  // Function to handle filter button press
  const handleFilterButtonPress = () => {
    if (selectedCategory) {
      clearFilter(); // Execute clear filter function
    } else {
      setModalVisible(true); // Open modal to select category
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <View style={styles.toggleButtonContainer}>
        <CustomTextInput
          placeholder="Search Recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        <TouchableOpacity
          onPress={handleFilterButtonPress}
          style={styles.iconButton}
        >
          <Text style={styles.categoryButtonText}>{filterButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDisplayMode}>
          <FontAwesome
            name={isSingleRow ? "th-large" : "list"}
            size={24}
            color="green"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {allRecipes.map((recipe, index) => renderRecipeCard(recipe, index))}
      </ScrollView>
      <CategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  toggleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeToggle: {
    backgroundColor: "#FF5733",
    borderColor: "#FF5733",
  },
  toggleText: {
    color: "#333",
  },
  activeToggleText: {
    color: "#fff",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeDetails: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  favoriteIcon: {
    position: "absolute",
    bottom: 1,
    right: 2,
  },
  searchBar: {
    flex: 1,
    marginBottom: 10,
    marginRight: 10,
  },
  iconButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "green",
    marginRight: 10,
  },
  categoryButtonText: {
    color: "#fff",
  },
  darkModeRTitle: {
    color: "#fff",
  },
  darkModeRDesc: {
    color: "#fff",
  },
  darkmodeCard: {
    backgroundColor: "#333",
  },
});

export default ShowMoreScreen;
