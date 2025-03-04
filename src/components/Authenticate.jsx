import React, { useState } from "react";
//import "./styles.css"; // Import the CSS file for styling

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
  
    async function handleClick() {
      try {
        if (!token) {
            setError("No token available. Please sign up first.");
            return;
        }

        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log("API Response:", result);
        setSuccessMessage(result.message);

        if (result.success && result.data) { 
            setUserData(result.data); 
            setError(null); 
        } else {
            setError("No user data returned.");
        }

      } catch (error) {
        setError(error.message);
      }
    }
  
    return (
      <div className="auth-container">
        <h2>Authenticate</h2>
        {successMessage && <p className="success">{successMessage}</p>}
        {error && <p className="error">{error}</p>}
        {userData && <p>Logged in as: <strong>{userData.username}</strong></p>}
        <button onClick={handleClick}>Authenticate Token!</button>
      </div>
    );
}
