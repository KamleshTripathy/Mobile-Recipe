import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/home";
import LandingPage from "../screens/landing";
import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";
import SplashScreen from "../screens/splash";
//import CustomSidebarMenu from "./components/customSidebar";
import ProfileScreen from "../screens/profile";
import FoodDetails from "../screens/HomeRecipe";
import FavoriteRecipesScreen from "../screens/yourFavorites";
import ShowMoreScreen from "../screens/showMore";
import EditProfileScreen from "../screens/edit";
import CartScreen from "../screens/cart";
import CartIconWithBadge from "../components/customCart";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

const getHeaderTitle = (route) => {
  switch (route.name) {
    case "Home":
      return "TastyByte"; // Custom header title for Home screen
    case "Profile":
      return "Profile Screen";
    default:
      return route.name;
  }
};
const getScreenOptions = () => ({
  headerTintColor: "white",
  headerStyle: { backgroundColor: "green" },
  headerTitleStyle: { fontWeight: "semibold", fontSize: 25 },
  headerTitleAlign: "left",
});

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          return <Ionicons name="home" size={size} color={color} />;
        } else if (route.name === "Profile") {
          return <Ionicons name="person" size={size} color={color} />;
        } else if (route.name === "Cart") {
          return <CartIconWithBadge color={color} size={size} />;
        }
      },
      tabBarActiveTintColor: "green",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
        headerTintColor: "white",
        headerStyle: { backgroundColor: "green" },
        headerTitleStyle: { fontWeight: "semibold", fontSize: 30 },
        headerTitleAlign: "Left",
      })}
    />
    <Tab.Screen name="Cart" component={CartScreen} options={getScreenOptions} />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={getScreenOptions}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodDetails"
          component={FoodDetails}
          options={getScreenOptions}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={getScreenOptions}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={getScreenOptions}
        />
        <Stack.Screen
          name="Favorite"
          component={FavoriteRecipesScreen}
          options={getScreenOptions}
        />
        <Stack.Screen
          name="AllRecipes"
          component={ShowMoreScreen}
          options={getScreenOptions}
        />
        <Stack.Screen
          name="Edit"
          component={EditProfileScreen}
          options={getScreenOptions}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
