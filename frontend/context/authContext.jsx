import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const jwttoken = await AsyncStorage.getItem("pptoken");
      console.log("Fetched token from storage:", jwttoken);
      if (jwttoken) {
        setToken(jwttoken);
        setIsLoggedIn(true);
        const decodedData = decodeToken(jwttoken);
        setUser(decodedData.user);
      }
    };

    fetchToken();
  }, [token]);

  const login = async (token) => {
    await AsyncStorage.setItem("pptoken", token);
    console.log("Token saved to storage:", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("pptoken");
    console.log("Token removed from storage");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
