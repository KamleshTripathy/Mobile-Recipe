import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../context/authContext";
import { useDarkMode } from "../context/darkmodeContext";
import CustomTextInput from "../components/customTextinput";
import userApiService from "../Api/userApi";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log(user);

    const res = await userApiService.loginUser(user);
    console.log(res);
    if (res.status) {
      setMessage("Login Successfull ");
      login(res.data.token);
      navigation.navigate("Main");
    } else {
      setMessage(res.message);
      setError(true);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Text style={[styles.header, isDarkMode && styles.darkModeHeader]}>
        Login
      </Text>
      <CustomTextInput
        placeholder="Username"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonpress} onPress={handleSubmit2}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
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
  text: {
    textAlign: "center",
    marginTop: 20,
  },
  darkText: {
    color: "#fff",
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
  darkModeHeader: {
    color: "#fff",
  },
});

export default LoginScreen;
