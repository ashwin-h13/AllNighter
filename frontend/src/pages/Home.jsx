import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";


export default function Home() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  const isAuthenticated = !!user;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        setMessage(`Account created and signed in as ${form.email}`);
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        setMessage(`Signed in as ${form.email}`);
      }
  } catch (err) {
    setError("Authentication failed: " + err.message);
  }
  };

  const handleSignOut = async () => {
  try {
    await signOut(auth);
    setForm({ email: "", password: "" });
    setMessage("");
    setError("");
  } catch (err) {
    setError("Sign out failed: " + err.message);
  }
};

  return (
    <div className="home-container">
      <h2>Welcome to All Nighter!</h2>
      <p>
        Use the planner, flashcards, quizzes, and progress tracker to study efficiently.
      </p>
      <p>
        Before proceeding, please create an account or sign in below.
      </p>

      {!isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            {isSignUp ? "Already have an account? Sign In" : "Create an Account"}
          </button>

          <h3>{isSignUp ? "Create Account" : "Sign In"}</h3>

          <input style={{ marginBottom: "10px" }}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <br/>

          <input 
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <br/>

          <button type="submit" style={{ marginTop: "15px" }}>
            Submit
          </button>

          {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      )}

      {isAuthenticated && (
        <div>
          <h3>Welcome, {user?.email}!</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

    </div>
  );
}
