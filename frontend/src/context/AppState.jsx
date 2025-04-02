import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
function AppState({ children }) {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL ||  "http://localhost:5000";
  console.log("Backend URL:", url);

  // Browser rendering
  useEffect(() => {
    const fetch = async () => {
      try {
        const api = await axios.get(`${url}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setMessage(api.data.message);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    userProfile();
    fetch();
  }, []);


  
   // userRegisger
  const userRegister = async (name, email, password) => {
    // console.log("User Data:", { name, email, password });

    try {
      const api = await axios.post(
        `${url}/api/user/register`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // console.log("API Response:", api);

      return api.data;
    } catch (error) {
      console.error("Error fetching userRegister :", error);

      if (error.response) {
        console.error("Server Response Data:", error.response.data); // Logs actual server error
      }
    }
  };

  // userLogin
  const userLogin = async (email, password) => {
    // console.log("User Data:", { email, password });

    try {
      const api = await axios.post(
        `${url}/api/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("API Response:", api);

      if (api.data.token) {
        localStorage.setItem("authToken", api.data.token); // Store token
        // setToken(api.data.token)
      }

      return api.data;
    } catch (error) {
      console.error("Error fetching userLogin :", error);

      if (error.response) {
        console.error("Server Response Data:", error.response.data); // Logs actual server error
      }
    }
  };

  // userProfile
  const userProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found. Please log in again.");
      return;
    }
    try {
      const api = await axios.get(`${url}/api/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Auth:token,
        },

        withCredentials: true,
      });

      // console.log("API Response:", api.data.user);
      setUser(api.data.user)
    } catch (error) {
      console.error("Error fetching Profile:", error);

      if (error.response) {
        console.error("Server Response Data:", error.response.data); // Logs actual server error
      }
    }
  };



  return (
    <AppContext.Provider value={{ message, userRegister, userLogin,user }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
