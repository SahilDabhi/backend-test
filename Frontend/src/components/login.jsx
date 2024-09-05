import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );
      if (response.data.status === "Successful login") {
        navigate("/");
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <h2> Login Page</h2>
        <form onSubmit={onHandleSubmit}>
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
          <button onClick={onHandleSubmit}>Submit</button>
        </form>
        <div className="login">
          <Link to="/register">SignUP Page</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
