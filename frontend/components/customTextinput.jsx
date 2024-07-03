import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useDarkMode } from "../context/darkmodeContext";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <TextInput
      style={[styles.input, isDarkMode && styles.darkModeInput, style]}
      placeholder={placeholder}
      placeholderTextColor={isDarkMode ? "#fff" : "gray"}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "#333",
  },
  darkModeInput: {
    borderColor: "#fff",
    color: "#fff",
  },
});

export default CustomTextInput;
