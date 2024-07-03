import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CartContext } from "../context/cartContext";
import { useDarkMode } from "../context/darkmodeContext";
import CustomButton from "../components/customButton";
import { Alert } from "react-native";

const CartScreen = () => {
  const {
    cartRecipes,
    removeFromCart,
    incrementItem,
    decrementItem,
    totalAmount,
  } = useContext(CartContext);
  const { isDarkMode } = useDarkMode();

  const handleEvent = () => {
    Alert.alert("Order Placed", "Thank You for shopping");
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.itemContainer, isDarkMode && styles.darkModeItem]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, isDarkMode && styles.darkModeTitle]}>
          {item.title}
        </Text>
        <Text style={[styles.price, isDarkMode && styles.darkModePrice]}>
          ${item.price}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decrementItem(item)}
          >
            <Icon
              name="remove-circle-outline"
              size={24}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <Text
            style={[styles.quantity, isDarkMode && styles.darkModeQuantity]}
          >
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => incrementItem(item)}
          >
            <Icon
              name="add-circle-outline"
              size={24}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item)}
        >
          <Icon name="trash-outline" size={20} color="#fff" />
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      {cartRecipes.length > 0 ? (
        <>
          <FlatList
            data={cartRecipes}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <Text
            style={[
              styles.totalAmount,
              isDarkMode && styles.darkModeTotalAmount,
            ]}
          >
            Total Amount: ${parseFloat(totalAmount).toFixed(2)}
          </Text>
          <CustomButton onPress={handleEvent} title="Place Order" />
        </>
      ) : (
        <Text style={[styles.emptyText, isDarkMode && styles.darkModeText]}>
          Your cart is empty.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  darkModeContainer: {
    backgroundColor: "#181818",
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  darkModeItem: {
    backgroundColor: "#333",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  darkModeTitle: {
    color: "#fff",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  darkModePrice: {
    color: "#bbb",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#000",
  },
  darkModeQuantity: {
    color: "#fff",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
  darkModeText: {
    color: "#bbb",
  },
  totalAmount: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000",
  },
  darkModeTotalAmount: {
    color: "#fff",
  },
});

export default CartScreen;
