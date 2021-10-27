import { Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
// Import Style
import "./Home.css";
// Import Components
import Logo from "../assets/img/Icon1.png";
import { API } from "../config/api";

const ReadBook = () => {
  const [location, setLocation] = useState(null);
  const [book, setBook] = useState(null);
  let { id } = useParams();

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      console.log(response);
      setBook(response.data.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);
  return (
    <Container className="padding-container" fluid="true">
      <Row>
        <Col md={12}>
          <div className="logo" style={{ paddingLeft: "200px", marginTop: "15px" }}>
            <Link to="/Home">
              <img src={Logo} alt="" />
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} style={{ height: "85vh", width: "200px" }}>
          <ReactReader
            location={location}
            locationChanged={locationChanged}
            url={book?.book_file}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default ReadBook;
