import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseClient"; // Ensure this points to your Firebase config file
import { sendSignInLinkToEmail, onAuthStateChanged } from "firebase/auth";
import styles from "../utils.module.css";

export const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const actionCodeSettings = {
            url: import.meta.env.VITE_PROJECT_URL || "http://localhost:5173/",
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem("emailForSignIn", email);
                alert("Check your email for the login link!");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Login error:", error.message);
                alert(`Login failed: ${error.message}`);
                setLoading(false);
            });
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/");
        }
    });

    return (
        <div className={styles.centeredFlex}>
            <div>
                <h1>My Notes App</h1>
                <p>Sign in via magic link with your email below</p>
                {loading ? (
                    "Sending magic link..."
                ) : (
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                        />
                        <button type="submit">Send magic link</button>
                    </form>
                )}
            </div>
        </div>
    );
};
