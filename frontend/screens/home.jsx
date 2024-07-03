import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import CustomButton from "../components/customButton";
import CustomTextInput from "../components/customTextinput";
import { useState } from "react";
import { useDarkMode } from "../context/darkmodeContext";

const categories = [
  {
    id: "1",
    title: "Appetizers",
    image:
      "https://cookcraftlove.com/wp-content/uploads/2015/11/Pineapple-and-bocconcini2-480x480.jpg",
  },
  {
    id: "2",
    title: "Main Courses",
    image:
      "https://assets.epicurious.com/photos/59e8f2f0d7423f64057d4439/1:1/w_320%2Cc_limit/pork-tenderloin-with-golden-beets-recipe-BA-101917.jpg",
  },
  {
    id: "3",
    title: "Desserts",
    image:
      "https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/16:9/w_4039,h_2272,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg",
  },
  {
    id: "4",
    title: "Drinks",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/juicy-orange-and-red-tequila-sunrise-royalty-free-image-1696959741.jpg?crop=0.536xw:1.00xh;0.245xw,0&resize=980:*",
  },
];

const recipes = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=440,400",
    description:
      "A creamy, savory pasta dish with crispy bacon and Parmesan cheese.",
    instruction:
      "Cook the spaghetti according to package instructions until al dente, reserving 1 cup of pasta water before draining. In a skillet, cook diced bacon until crispy, then remove and set aside. In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper. Toss the cooked spaghetti with the egg mixture, adding reserved pasta water as needed for creaminess. Mix in the crispy bacon and serve immediately.",
    time: "20 minutes",
    servings: "4",
    category: "Appetizers",
    price: "200",
  },
  {
    id: "2",
    title: "Chocolate Chip Cookies",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSNuwd8f8m62N5bRXVPEaVBerL_Ee7lg99hA&s",
    description:
      "Classic homemade cookies studded with chocolate chips, crispy on the edges and soft in the middle.",
    instruction:
      "Preheat oven to 350°F (175°C) and line baking sheets with parchment paper. In a mixing bowl, cream together softened butter, white sugar, and brown sugar until light and fluffy. Beat in eggs, one at a time, then stir in vanilla extract. In a separate bowl, whisk together flour, baking soda, and salt, then gradually add dry ingredients to the wet ingredients, mixing until combined. Fold in chocolate chips. Drop tablespoon-sized balls of dough onto prepared baking sheets, spacing them apart. Bake for 8-10 minutes, or until edges are golden brown. Let cool on the baking sheet for a few minutes before transferring to a wire rack to cool completely.",
    time: "30 minutes",
    servings: "24 cookies",
    category: "Desserts",
    price: "350",
  },
  {
    id: "3",
    title: "Grilled Lemon Herb Chicken",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ne9niCIuEcfJsCduQ08v4cm1BVSIdc3Gbw&s",
    description:
      "Tender chicken marinated in a zesty lemon and herb marinade, perfect for grilling.",
    instruction:
      " In a bowl, combine olive oil, lemon juice, minced garlic, chopped fresh herbs (such as rosemary, thyme, and parsley), salt, and pepper. Marinate chicken breasts in the mixture for at least 30 minutes, or overnight for maximum flavor. Preheat grill to medium-high heat and oil the grates. Grill chicken for 6-8 minutes per side, or until cooked through and juices run clear. Let chicken rest for a few minutes before serving.",
    time: "40 minutes",
    servings: "4",
    category: "Appetizers",
    price: "250",
  },
  {
    id: "4",
    title: "Honey Garlic Glazed Salmon",
    image:
      "https://www.wellplated.com/wp-content/uploads/2021/01/How-to-Make-Honey-Garlic-Glazed-Salmon.jpg",
    description:
      "Succulent salmon fillets glazed with a sweet and savory honey garlic sauce, served with steamed vegetables.",
    instruction:
      " Preheat oven to 400°F (200°C). In a small saucepan over medium heat, combine honey, soy sauce, minced garlic, grated ginger, and a pinch of red pepper flakes. Simmer for 3-4 minutes until slightly thickened. Place salmon fillets on a lined baking sheet and brush generously with the honey garlic sauce. Bake for 12-15 minutes, or until salmon flakes easily with a fork. While the salmon bakes, steam a mix of broccoli, carrots, and snap peas until tender-crisp. Serve the honey garlic glazed salmon hot with steamed vegetables on the side.",
    time: "25 minutes",
    servings: "4",
    category: "Main Courses",
    price: "750",
  },
  {
    id: "5",
    title: "Classic Mojito",
    image: "https://cookieandkate.com/images/2020/08/best-mojito-recipe-2.jpg",
    description:
      "A refreshing cocktail with a perfect balance of fresh mint, lime, sugar, and rum.",
    instruction:
      " In a sturdy glass, muddle fresh mint leaves and sugar together to release the mint oils. Add fresh lime juice and continue to muddle gently. Fill the glass with ice cubes. Pour white rum over the ice and top off with club soda. Stir gently to combine. Garnish with a sprig of mint and a lime wedge. Serve immediately and enjoy!",
    time: "5 minutes",
    servings: "1",
    category: "Drinks",
    price: "150",
  },
];

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const initialRecipesToShow = recipes.slice(0, 3);
  const [visibleRecipes, setVisibleRecipes] = useState(initialRecipesToShow);

  const handleSearch = (text) => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(text.toLowerCase()) ||
        recipe.category.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setVisibleRecipes(text ? filtered : initialRecipesToShow);
  };

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setVisibleRecipes(initialRecipesToShow);
    } else {
      setSelectedCategory(category);
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setVisibleRecipes(filtered);
    }
  };
  const clearFilter = () => {
    setSelectedCategory(null);
    setVisibleRecipes(initialRecipesToShow); // Reset to all recipes
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        selectedCategory === item.title && styles.selectedCategory,
      ]}
      onPress={() => handleCategorySelect(item.title)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryTitle,
          isDarkMode && styles.darkModeCategoryTitle,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.recipeContainer,
        isDarkMode && styles.darkmodecatContainer,
      ]}
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
  const showAllRecipes = () => {
    navigation.navigate("AllRecipes", { recipes, categories }); // Navigate to screen displaying all recipes
  };

  return (
    <View
      style={[styles.mainContainer, isDarkMode && styles.darkModeContainer]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
        <CustomTextInput
          placeholder="Search Recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        <Text style={[styles.header, isDarkMode && styles.darkModeHeader]}>
          Recipe Categories
        </Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.categoriesList}
          showsHorizontalScrollIndicator={false}
          style={{ height: "30%" }}
        />
        {selectedCategory && (
          <CustomButton
            title="Clear Filter"
            onPress={clearFilter}
            style={styles.clearFilterButton}
          />
        )}
        <Text style={[styles.header, isDarkMode && styles.darkModeHeader]}>
          Popular Recipes
        </Text>
        <FlatList
          data={visibleRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ height: "55%" }}
        />
        <CustomButton
          title="Show More"
          onPress={showAllRecipes}
          style={styles.showMoreButton}
          textStyle={styles.showMoreText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
    marginBottom: 5,
  },
  categoriesList: {
    marginBottom: 5,
  },
  categoryContainer: {
    marginRight: 15,
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 16,
    color: "#666",
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
  searchBar: {
    marginBottom: 5,
  },
  clearFilterButton: {
    alignSelf: "flex-end",
  },
  showMoreButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  darkModeSearch: {
    borderColor: "#fff",
  },
  darkModeHeader: {
    color: "#fff",
  },
  darkModeCategoryTitle: {
    color: "#fff",
  },
  darkModeRecipeTitle: {
    color: "#fff",
  },
  darkmodecatContainer: {
    backgroundColor: "#333",
  },
});

export default HomeScreen;
