import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";

import CustomButton from "../components/customButton";

const LandingPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-photo/colorful-various-herbs-spices-cooking-dark-background_370312-414.jpg?size=626&ext=jpg&ga=GA1.1.1387001284.1714034844&semt=ais_user",
      }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <Image
          source={{ uri: "https://example.com/recipe-app-logo.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to TastyByte</Text>
        <Text style={styles.subtitle}>
          Discover thousands of recipes at your fingertips.
        </Text>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate("Main")}
          style={styles.largeButton}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
          <CustomButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
            style={styles.smallButton}
            textStyle={styles.smallButtonText}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "beige",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "44%",
  },
  smallButtonText: {
    fontSize: 16,
  },
  largeButton: {
    width: "100%",
  },
});

export default LandingPage;
