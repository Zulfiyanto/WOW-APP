// Import Style
import "./style/ProfileSideBar.css";
// Import Photo
import UserPhoto from "../assets/img/Photo-profile.jpg";
import Logo from "../assets/img/Icon1.png";
import profileIcon from "../assets/img/profile.svg";
import profileIconP from "../assets/img/userp.svg";
import subscribeIcon from "../assets/img/Subscribe.svg";
import subscribeIconP from "../assets/img/Subscribe-p.svg";
import logoutIcon from "../assets/img/Logout.svg";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
const ProfileSide = () => {
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory();
  const location = useLocation();
  console.log(state);

  const OnLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };

  return (
    <div className="leftbar-profile">
      <div className="leftbar-top">
        <div className="logo">
          <Link to="/Home">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="photo-profile">
          {state.user.profile_file === "http://localhost:5000/uploads/null" ? (
            <img src={UserPhoto} alt="" />
          ) : (
            <img src={state.user.profile_file} alt="" />
          )}
        </div>

        <div className="username"> {state.user.fullname}</div>
        {state.user.user_status === "active" ? (
          <div className="subscribe-status" style={{ color: "#29BD11" }}>
            Subscribed
          </div>
        ) : (
          <div className="subscribe-status">Not Subscribed Yet</div>
        )}
      </div>

      {location.pathname === "/Profile" ? (
        <div className="profile-nav" style={{ color: "#D60000" }}>
          <Link to="/Profile">
            <img src={profileIconP} alt="" />
            Profile
          </Link>
        </div>
      ) : (
        <div className="profile-nav">
          <Link to="/Profile">
            <img src={profileIcon} alt="" />
            Profile
          </Link>
        </div>
      )}
      {location.pathname === "/Subscribe" ? (
        <div className="subscribe-nav" style={{ color: "#D60000" }}>
          <Link to="/Subscribe">
            <img src={subscribeIconP} alt="" />
            Subscribe
          </Link>
        </div>
      ) : (
        <div className="subscribe-nav">
          <Link to="/Subscribe">
            <img src={subscribeIcon} alt="" />
            Subscribe
          </Link>
        </div>
      )}
      <div className="logout">
        <Link onClick={OnLogout}>
          <img src={logoutIcon} alt="" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default ProfileSide;
