import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/DataContext";
import api_url from "../../Axio";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigator = useNavigate();
  const { user, setUser } = useContext(AppState);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };
    const response = fetch(`${api_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Invalid username or password.") {
          setError(data.message);
          setSuccess("");
        } else {
          setError("");
          setSuccess(data.message);
          setTimeout(() => {
            navigator("/");
          });
          console.log(data);
          localStorage.setItem("token", data.token);
          setUser(data.user);
        }
      })
      .catch((error) => console.error(error.message));
    console.log("Logging in with:", { username, password });
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && (
          <p style={{ color: "green", textAlign: "center" }}> {success}</p>
        )}
        {/* Email Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="email"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
