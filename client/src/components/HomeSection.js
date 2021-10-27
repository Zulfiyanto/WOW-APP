import { Col, Row } from "react-bootstrap";
// Import Style
import "./style/HomeSection.css";
// Import Photo
import banner from "../assets/img/Banner.png";
import { Link, useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

const HomeSection = (props) => {
  let history = useHistory();
  const [states] = useContext(UserContext);

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await API.get("/books");

      setBooks(response.data.data.books);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className="right-section">
      <div className="banner-section">
        <img src={banner} alt="" />
        <img
          style={{ position: "absolute", left: "1000px", top: "40px", width: "15%" }}
          src={books[books.length - 1]?.cover}
          alt=""
        />
      </div>
      <div className="list-book">
        <div className="title">List Book</div>
        <Row className="list">
          {books?.map((state, i) => (
            <Col md={3} key={i}>
              {states.user.user_status === "active" ? (
                <Link to={{ pathname: `/Detail/${state.id}` }}>
                  <div className="card">
                    <img src={state.cover} alt="img" rounded />
                    {state.title.length > 20 ? (
                      <div className="title-card-more">{state.title}</div>
                    ) : (
                      <div className="title-card">{state.title}</div>
                    )}
                    <div className="writer">{state.author}</div>
                  </div>
                </Link>
              ) : (
                <Link onClick={props.modal} to="/Home">
                  <div className="card">
                    <img src={state.cover} alt="img" rounded />
                    {state.title.length > 20 ? (
                      <div className="title-card-more">{state.title}</div>
                    ) : (
                      <div className="title-card">{state.title}</div>
                    )}
                    <div className="writer">{state.author}</div>
                  </div>
                </Link>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default HomeSection;
