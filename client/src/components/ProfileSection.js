import { Col, Row } from "react-bootstrap";
// Import Photo
import Email from "../assets/icon/MailIcon.svg";
import Gender from "../assets/icon/GenderIcon.svg";
import Telp from "../assets/icon/TelpIcon.svg";
import Point from "../assets/icon/PointIcon.svg";
import PhotoProfile from "../assets/img/Photo-profile.jpg";
// Import Style
import "./style/ProfileSection.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useHistory, useParams } from "react-router";
import { API } from "../config/api";
import { ModalProfile } from "./ModalComponent";

const ProfileSection = () => {
  let history = useHistory();
  const [state] = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [preview, setPreview] = useState(null);
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const [form, setForm] = useState({
    email: "",
    gender: "",
    phone: "",
    address: "",
    profile_file: "",
  });

  // Modal Handler
  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  const getUser = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      console.log(response.data.data.users);
      setForm({
        ...form,
        email: response.data.data.users.email,
        phone: response.data.data.users.phone,
        gender: response.data.data.users.gender,
        address: response.data.data.users.address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("email", form.email);
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("profile_file", form.profile_file[0], form.profile_file[0].name);

      await API.patch("/user/" + state.user.id, formData, config);
      getUser();
      // history.push("/Profile");
      // setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getBook = async () => {
    try {
      const response = await API.get("/my-list/" + state.user.id);

      setBooks(response.data.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
    getUser();
  }, [reload]);
  return (
    <div className="right-section">
      <ModalProfile
        OnChange={handleChange}
        show={showProfile}
        hide={handleCloseProfile}
        submit={handleSubmit}
        preview={preview}
        email={form.email}
        gender={form.gender}
        phone={form.phone}
        address={form.address}
      />
      <div className="profile">
        <div className="title">Profile</div>
        <div className="box-profile">
          <div className="list-bio">
            <div className="list-profile">
              <img src={Email} alt="" />
              <div className="text-profile">
                <div className="text-top">{state.user.email}</div>
                <div className="text-bottom">Email</div>
              </div>
            </div>
            <div className="list-profile">
              <img src={Gender} alt="" />
              <div className="text-profile">
                <div className="text-top">{state.user.gender}</div>
                <div className="text-bottom">Gender</div>
              </div>
            </div>
            <div className="list-profile">
              <img src={Telp} alt="" />
              <div className="text-profile">
                <div className="text-top">{state.user.phone}</div>
                <div className="text-bottom">Mobile Phone</div>
              </div>
            </div>
            <div className="list-profile">
              <img src={Point} alt="" />
              <div className="text-profile">
                <div className="text-top">{state.user.address}</div>
                <div className="text-bottom">Address</div>
              </div>
            </div>
          </div>
          <div className="photo-btn">
            <div className="image-profile">
              {state?.user.profile_file === "http://localhost:5000/uploads/null" ? (
                <img src={PhotoProfile} alt="profile" />
              ) : (
                <img src={state.user?.profile_file} alt="profile" />
              )}
            </div>
            <div className="btn-profile">
              <button onClick={handleShowProfile}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="list-book">
        <div className="title">My List Book</div>
        <Row className="list">
          {books.map((state, i) => (
            <Col
              key={i}
              md={3}
              onClick={() => {
                history.push("/Detail/" + state.books.id);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card">
                <img src={state.cover} alt="" rounded />
                <div className="title-card">{state.books.title}</div>
                <div className="writer">{state.books.author}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default ProfileSection;
