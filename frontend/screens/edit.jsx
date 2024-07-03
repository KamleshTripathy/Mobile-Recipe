import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { useDarkMode } from "../context/darkmodeContext";
import userApiService from "../Api/userApi";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const { isDarkMode } = useDarkMode();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const getUserDetails = async (userId) => {
    const res = await userApiService.userDetails(userId);
    if (res.data) {
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
      setMobile(res.data.mobile);
    }
  };

  useEffect(() => {
    getUserDetails(userId);
  }, [userId]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSubmit = async () => {
    const updatedUser = {
      name,
      email,
      mobile,
    };

    const userRes = await userApiService.updateUser(userId, updatedUser);

    if (userRes.status) {
      console.log("Success");
    } else {
      console.log("Unsuccess");
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg",
          }}
          size={90}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="User name"
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            style={[styles.input, isDarkMode && styles.darkModeInput]}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkModeInput]}
            value={email}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkModeInput]}
            value={mobile}
            placeholder="Mobile"
            placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
            keyboardType="tel"
            onChangeText={setMobile}
          />
        </View>
        <TouchableOpacity
          mode="contained"
          onPress={handleSubmit}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoSection: {
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    width: "100%",
    fontSize: 18,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "green",
    borderRadius: 10,
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  darkModeInput: {
    borderColor: "#555",
    color: "#fff",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 20,
  },
});

export default EditProfileScreen;
