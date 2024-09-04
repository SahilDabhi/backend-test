import { SignUp } from "./components/signup";
import Login from "./components/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <div>
          <Link to="/register">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
