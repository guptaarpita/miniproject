import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
      );

      if (response.data.success) {
        const { token, ...userInfo } = response.data.data;
        localStorage.setItem("user", JSON.stringify({ ...userInfo, token }));
        setAuthToken(token);
        setUser({ ...userInfo, token });
        return { success: true };
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      if (response.data.success) {
        const { token, ...userInfo } = response.data.data;
        localStorage.setItem("user", JSON.stringify({ ...userInfo, token }));
        setAuthToken(token);
        setUser({ ...userInfo, token });
        return { success: true };
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        profileData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      }
    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAuthor: user?.role === "author",
    isPublisher: user?.role === "publisher",
    isReader: user?.role === "reader",
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
