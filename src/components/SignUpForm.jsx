import { useState } from "react";
//import "./styles.css";

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);

    function validateForm() {
        if (username.length < 8) {
            setUsernameError("Username must be at least 8 characters long.");
            return false;
        }
        setUsernameError(null);
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;

        const url = "https://fsa-jwt-practice.herokuapp.com/signup";
        const userData = { username, password };

        try {
            const response = await fetch(url, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData), 
            });
            const result = await response.json();
            console.log(result);
            if (result.token) {
                setToken(result.token);  
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username: 
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>
                {usernameError && <p className="error">{usernameError}</p>}
                <label>Password: 
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form> 
        </div>
    );
}
