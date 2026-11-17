
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    // Check whether passwords match
    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        history.push("/login");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error(error);
      props.showAlert("Something went wrong. Please try again.", "danger");
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
        Signup To Create Account
      </h1>

      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            value={credentials.name}
            onChange={handleChange}
            minLength={5}
            required
            name="name"
            className="form-control"
            id="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            name="email"
            onChange={handleChange}
            minLength={5}
            required
            id="email"
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={handleChange}
            minLength={5}
            required
            name="password"
            className="form-control"
            id="password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={credentials.cpassword}
            onChange={handleChange}
            minLength={5}
            required
            name="cpassword"
            className="form-control"
            id="cpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
