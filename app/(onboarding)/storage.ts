import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const tokenKey = "authToken";
const userKey = "authUser"; // Add a key for user data

// Store token
const storeToken = async (value: string) => {
  try {
    if (typeof value !== "string") {
      console.error("Token must be a string but got:", typeof value);
      return;
    }
    await SecureStore.setItemAsync(tokenKey, value);
  } catch (error) {
    console.log("Error while storing token:", error);
  }
};

// Store user
const storeUser = async (userData: any) => {
  try {
    if (typeof userData !== "object") {
      console.error("User data must be an object but got:", typeof userData);
      return;
    }
    await SecureStore.setItemAsync(userKey, JSON.stringify(userData));
  } catch (error) {
    console.log("Error while storing user:", error);
  }
};

// Get token
const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(tokenKey);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Get user
const getUser = async () => {
  try {
    const userData = await SecureStore.getItemAsync(userKey);
    if (!userData) return null;

    return JSON.parse(userData); // Parse the stored user data
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Remove token
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(tokenKey);
  } catch (error) {
    console.log("Error removing token:", error);
  }
};

// Remove user
const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(userKey);
  } catch (error) {
    console.log("Error removing user:", error);
  }
};

// Get decoded user from token
const getUserFromToken = async () => {
  const token = await getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    const isTokenExpired = decoded.exp * 1000 < Date.now();
    return isTokenExpired ? null : decoded;
  } catch {
    return null;
  }
};

export default {
  storeToken,
  storeUser,
  getToken,
  getUser,
  getUserFromToken,
  removeToken,
  removeUser,
};
