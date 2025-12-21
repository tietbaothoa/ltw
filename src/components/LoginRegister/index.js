import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { handleData } from "../../modelData/api";
import { API }  from "../../App.js";


function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    localStorage.removeItem("token");
    e.preventDefault();
    const data = { login_name: username, login_pass: password };
    handleData(API + "/api/admin/login", "POST", data)
      .then((data) => {
        onLogin(data.user);
        localStorage.setItem("token", data.token);
        navigate("/users");
      })
      .catch((err) => alert("Login failed: " + err.message));
  }

  return (
    <div>
      <h2>Login Page</h2>
      <p></p>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Username:
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />

        <label>
          Password:
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function Logout({ onLogout }) {
  const navigate = useNavigate();
  useEffect(() => {
    onLogout("");
    localStorage.removeItem("token");
    navigate("/login");
  }, []);

  return null;
}

function Register() {
  const [info, setInfo] = useState({
    login_name: "",
    login_pass: "",
    retype_password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  function checkPasswordMatch() {
    return info.login_pass === info.retype_password;
  }

  function handleSubmit(e){
    e.preventDefault();
    if (!checkPasswordMatch()) {
      alert("Passwords do not match!");
      return;
    }
    const { retype_password, ...payload } = info;
    handleData(API + "/api/admin/register", "POST", payload)
      .then((data) => {
        console.log(data);
        alert("Registration successful! Please log in.");
      })
      .catch((err) => alert("Registration failed: " + err.message));
  }

  return (
    <div>
      <h2>Register Page</h2>
      <p>Registration functionality</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <label >
          Username:<input type="text" name="login_name" onChange={(e) => setInfo({ ...info, login_name: e.target.value })} />
        </label>
        <br />
        <label >
          Password:<input type="password" name="login_pass" onChange={(e) => setInfo({ ...info, login_pass: e.target.value })} />
        </label>
        <br />
        <label>
          Retype - Password:<input type="password" name="retype_password" onChange={(e) => setInfo({ ...info, retype_password: e.target.value })} />
        </label>
        <br />
        <label>
          First name:<input type="text" name="first_name" onChange={(e) => setInfo({ ...info, first_name: e.target.value })} />
        </label>
        <br />
        <label>
          Last name:<input type="text" name="last_name" onChange={(e) => setInfo({ ...info, last_name: e.target.value })} />
        </label>
        <br />
        <label>
          Location:<input type="text" name="location" onChange={(e) => setInfo({ ...info, location: e.target.value })} />
        </label>
        <br />
        <label>
          Description:<textarea type="text" name="description" onChange={(e) => setInfo({ ...info, description: e.target.value })} />
        </label>
        <br />
        <label>
          Occupation:<input type="text" name="occupation" onChange={(e) => setInfo({ ...info, occupation: e.target.value })} />
        </label>
        <br />
        <button type="submit">Register Me</button>
      </form>
    </div>
  )
}

export { Login, Logout, Register };