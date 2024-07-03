import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CartContext } from "../context/cartContext";

const CartIconWithBadge = ({ color, size }) => {
  const { cartCount } = useContext(CartContext);

  return (
    <View style={styles.iconContainer}>
      <Ionicons name="cart" size={size} color={color} />
      {cartCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 8,
    padding: 2,
    paddingHorizontal: 5,
    minWidth: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CartIconWithBadge;
