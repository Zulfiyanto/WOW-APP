import Logo from "../assets/img/Icon1.png";
import Admin from "../assets/img/admin.png";
import "./style/Navbar.css";
import Dropdown from "react-bootstrap/Dropdown";
import { BiBookAdd } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
const NavbarPage = () => {
  let addBookHistory = useHistory();
  let logOutHistory = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const addBook = () => {
    addBookHistory.push("/Add");
  };

  const OnLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    logOutHistory.push("/");
  };

  return (
    <div className="navbar-box">
      <div className="logo">
        <img src={Logo} style={{ marginTop: "45px" }} alt="" />
      </div>
      <div className="admin-photo">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="drop-toggle">
            <img src={Admin} alt="" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item className="dropdown-admin" onClick={addBook}>
              <div className="icon-admin">
                <BiBookAdd />
              </div>
              Add Book
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item className="dropdown-admin" onClick={OnLogout}>
              <div className="icon-admin">
                <HiOutlineLogout />
              </div>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
export default NavbarPage;
