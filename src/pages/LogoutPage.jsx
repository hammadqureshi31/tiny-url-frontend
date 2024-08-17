import axios from "axios";
import React, { useEffect } from "react";
import { backendPortURL } from "../../confiq"; // Ensure your config file path is correct
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        axios
          .post(`${backendPortURL}user/logout`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data)
            navigate('/')
          })
          .catch((error) => console.error("Error:", error));
      } catch (error) {
        console.error("Error logging out:", error);
        // Optionally, display an error message to the user
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging Out...</div>;
};

export default LogoutPage;
