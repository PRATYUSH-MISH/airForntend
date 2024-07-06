import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://server-1-z5y0.onrender.com/auth/signup', user, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status === 201) {
        window.alert("Signup successful!");
        localStorage.setItem("authToken", res.data.token);
        navigate('/');
      } else {
        window.alert("Signup failed. Please check your details and try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
        console.error("Error data:", error.response.data);
      } else {
        setError("Signup failed. Please try again.");
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to="/">Login Page</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              autoComplete="name"
              required
              value={user.name}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Email Address"
              autoComplete="email"
              required
              value={user.email}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Password"
              autoComplete="new-password"
              required
              value={user.password}
              onChange={handleInputs}
            />
          </div>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
