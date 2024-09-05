import { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Sign UP</h2>
        <form onSubmit={onHandleSubmit}>
          <div>
            <label>UserName</label>
            <input
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              placeholder="Enter your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="login">
          <Link to="/login">Login Page</Link>
        </div>
      </div>
    </>
  );
};
