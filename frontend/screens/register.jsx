import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useDarkMode } from "../context/darkmodeContext";
import CustomTextInput from "../components/customTextinput";

const RegisterScreen = ({ navigation }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Text style={[styles.header, isDarkMode && styles.darkModeheader]}>
        Register
      </Text>
      <CustomTextInput placeholder="Username" />
      <CustomTextInput placeholder="Password" secureTextEntry />
      <CustomTextInput placeholder="Confirm Password" secureTextEntry />

      <TouchableOpacity
        style={styles.buttonpress}
        onPress={() => console.log("Register pressed")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "green",
    textDecorationLine: "none",
  },
  buttonpress: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  darkModeheader: {
    color: "#fff",
  },
  darkText: {
    color: "#fff",
  },
});

export default RegisterScreen;
