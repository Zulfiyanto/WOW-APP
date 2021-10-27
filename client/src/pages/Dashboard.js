// Import Library
import { useContext, useState } from "react";
import { useHistory } from "react-router";
// Import Component
import { ModalLogin, ModalRegist } from "../components/ModalComponent";
// Import Style
import "./Dashboard.css";
// Import Photo
import Logo from "../assets/img/Icon1.png";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { Alert } from "react-bootstrap";

const Dashboard = () => {
  // State
  const [login, setLogin] = useState({ email: "", password: "" });
  const [regist, setRegist] = useState({ email: "", fullname: "", password: "" });
  // modal state
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  // Modal handler
  const handleShowRegist = () => setShowRegister(true);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

  const { email, fullname, password } = regist;
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [messageLogin, setMessageLogin] = useState(null);
  const [messageRegist, setMessageRegist] = useState(null);

  // Function
  const OnChangeRegist = (e) => {
    setRegist({ ...regist, [e.target.name]: e.target.value });
  };
  const OnChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const RegisterSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(regist);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // Notification
      if (response.data.status === "success...") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register success , please Login..
          </Alert>
        );
        setMessageRegist(alert);
      } else {
        const alert = (
          <Alert variant="success" className="py-1">
            Register success , please Login..
          </Alert>
        );
        setMessageRegist(alert);
      }
    } catch (err) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Register Failed
        </Alert>
      );
      setMessageRegist(alert);
      console.log(err);
    }
  };

  const LoginSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Data body
      const body = JSON.stringify(login);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      console.log(response);

      // Checking process

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      console.log(response);

      localStorage.setItem("token", response.data.data.user.token);
      setAuthToken(response.data.data.user.token);

      // Status check
      if (response.data.data.role === "admin") {
        history.push("/Transaction");
      } else {
        history.push("/Home");
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessageLogin(alert);
    } catch (err) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login Failed
        </Alert>
      );
      setMessageLogin(alert);
      console.log(err);
    }
  };

  return (
    <>
      <div className="section">
        {messageRegist && messageRegist}
        <div className="icon">
          <img src={Logo} alt="" />
        </div>
        <div className="description-dash">
          Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental
          service provider in Indonesia
        </div>
        <div className="btn-home">
          <button style={{ backgroundColor: "#D60000", color: "white" }} onClick={handleShowRegist}>
            Sign Up
          </button>
          <button
            style={{ backgroundColor: "#CDCDCDB2", color: "black" }}
            onClick={handleShowLogin}
          >
            Sign In
          </button>
        </div>
      </div>
      <ModalRegist
        name={fullname}
        email={email}
        pass={password}
        change={OnChangeRegist}
        showLogin={handleShowLogin}
        showRegist={showRegister}
        showRegister={handleShowRegist}
        hideRegist={handleCloseRegister}
        submit={RegisterSubmit}
        message={messageRegist}
      />

      <ModalLogin
        showLogin={showLogin}
        submit={LoginSubmit}
        change={OnChangeLogin}
        hideLogin={handleCloseLogin}
        showRegist={handleShowRegist}
        message={messageLogin}
        email={login.email}
        password={login.password}
      />
    </>
  );
};

export default Dashboard;
