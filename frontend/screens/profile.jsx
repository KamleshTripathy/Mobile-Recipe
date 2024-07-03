import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
//import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/authContext";
import { useDarkMode } from "../context/darkmodeContext";

const ProfileScreen = ({ navigation }) => {
  const authContext = useAuth();

  console.log(authContext);
  const { user, isLoggedIn, logout } = authContext;
  console.log(user);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleAddRecipe = () => {
    // Add your add recipe logic here
    console.log("Add Recipe pressed");
  };

  const handleViewRecipe = () => {
    // Add your view recipe logic here
    console.log("View Recipe pressed");
  };

  const handleSubmit = () => {
    navigation.navigate("Favorite");
  };

  return (
    <ScrollView
      style={[styles.container, isDarkMode && styles.darkModeContainer]}
    >
      {isLoggedIn ? (
        <>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg",
                }}
                size={90}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    { marginTop: 35, marginBottom: 5 },
                    isDarkMode && styles.darkModeTitle,
                  ]}
                >
                  Hi!!{user.name}
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple
              onPress={() => navigation.navigate("Edit", { userId: user.id })}
            >
              <View style={styles.menuItem}>
                <Icon name="pencil-outline" color="green" size={25} />
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={handleSubmit}>
              <View style={styles.menuItem}>
                <Icon name="heart-outline" color="green" size={25} />
                <Text style={styles.menuItemText}>Your Favorites</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="cog-outline" color="green" size={25} />
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.menuWrapper}>
            <View style={styles.menuItem}>
              <Icon name="theme-light-dark" color="green" size={25} />
              <Text style={styles.menuItemText}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleAddRecipe}
            >
              <Icon name="plus" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Add Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleViewRecipe}
            >
              <Icon
                name="book-open-outline"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>My Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={logout}
            >
              <Icon name="logout" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg",
                }}
                size={90}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    { marginTop: 15, marginBottom: 5 },
                    isDarkMode && styles.darkModeTitle,
                  ]}
                >
                  Hi User{" "}
                  <Text
                    style={[styles.link, { color: "green" }]}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
                  </Text>{" "}
                  for
                </Title>
                <Title
                  style={[
                    styles.title,
                    { marginTop: 15, marginBottom: 5 },
                    isDarkMode && styles.darkModeTitle,
                  ]}
                >
                  more features
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="cog-outline" color="green" size={25} />
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.menuWrapper}>
            <View style={styles.menuItem}>
              <Icon name="theme-light-dark" color="green" size={25} />
              <Text style={styles.menuItemText}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  darkModeTitle: {
    color: "#fff",
  },
});

export default ProfileScreen;
