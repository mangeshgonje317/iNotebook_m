
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API_BASE_URL from '../api';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      // Read response safely
      const text = await response.text();

      let json;
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Backend returned an invalid response");
      }

      console.log("Login response:", response.status, json);

      if (!response.ok) {
        throw new Error(
          json.error || json.message || `Login failed: ${response.status}`
        );
      }

      if (json.success && json.authtoken) {
        localStorage.setItem('token', json.authtoken);

        props.showAlert("Login successful", "success");
        history.push("/");
      } else {
        props.showAlert(
          json.error || "Invalid credentials",
          "danger"
        );
      }

    } catch (error) {
      console.error("Login error:", error);
      props.showAlert(
        error.message || "Something went wrong, try again",
        "danger"
      );
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Login To Access Your Notes
      </h1>

      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            value={credentials.email}
            name="email"
            onChange={handleChange}
            id="exampleInputEmail1"
            required
          />

          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>

          <input
            type="password"
            value={credentials.password}
            onChange={handleChange}
            name="password"
            className="form-control"
            id="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
