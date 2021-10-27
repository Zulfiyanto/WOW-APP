// Import Style
import fileImage from "../assets/img/fileAdded.svg";
import "./Home.css";
// Import Components
import NavbarPage from "../components/Navbar";
// Import Library
import { Col, Container, Form, Row } from "react-bootstrap";
import { BsPaperclip } from "react-icons/bs";
import { BiBookAdd } from "react-icons/bi";
import { useHistory } from "react-router";
import { useState } from "react";
import { API } from "../config/api";

const AddBook = () => {
  let history = useHistory();
  const [preview, setPreview] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    book_file: "",
  });

  // Condition for files type or value type input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
    }
  };

  const handleChangeFile = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreviewFile(fileImage);
    }
  };

  // Handle for submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("date", form.date);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      formData.set("cover", form.cover[0], form.cover[0].name);
      formData.set("book_file", form.book_file[0], form.book_file[0].name);

      await API.post("/book", formData, config);

      history.push("/Transaction");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="padding-container" fluid="true">
      <Row>
        <Col md={12}>
          <NavbarPage />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="tb-section">
          <div className="input-box-admin">
            <div className="input-section">
              <div className="title" style={{ marginBottom: "20px" }}>
                Add Book
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  className="input-admin"
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  onChange={handleChange}
                />
                <Form.Group controlId="date">
                  <Form.Control
                    className="input-admin date-input"
                    type="date"
                    name="date"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Control
                  className="input-admin"
                  type="number"
                  name="pages"
                  placeholder="Enter Pages"
                  onChange={handleChange}
                />
                <Form.Control
                  className="input-admin"
                  type="text"
                  name="author"
                  placeholder="Enter Author"
                  onChange={handleChange}
                />
                <Form.Control
                  className="input-admin"
                  type="text"
                  name="isbn"
                  placeholder="Enter ISBN"
                  onChange={handleChange}
                />
                <Form.Control
                  className="input-admin-textarea"
                  as="textarea"
                  name="about"
                  placeholder="About This Book"
                  onChange={handleChange}
                />
                <div className="d-flex">
                  <div className="cover-attach">
                    {preview && (
                      <div className="image-preview">
                        <img
                          src={preview}
                          style={{
                            maxWidth: "300px",
                            maxHeight: "250px",
                            objectFit: "cover",
                          }}
                          alt="preview"
                        />
                      </div>
                    )}
                    <div className="upload-input">
                      <input
                        className="input-admin"
                        type="file"
                        name="cover"
                        id="imgs"
                        onChange={handleChange}
                        style={{ width: "100%", display: "none", height: "100%" }}
                      />
                      <label htmlFor="imgs">Attache Book Cover</label>
                      <BsPaperclip style={{ fontSize: "2rem" }} />
                    </div>
                  </div>

                  <div className="book-file-attach">
                    {previewFile && (
                      <div className="image-preview">
                        <img
                          src={previewFile}
                          style={{
                            maxWidth: "300px",
                            maxHeight: "260px",
                            objectFit: "cover",
                          }}
                          alt="preview"
                        />
                      </div>
                    )}
                    <div className="upload-input">
                      <input
                        className="input-admin"
                        type="file"
                        name="book_file"
                        id="img"
                        onChange={handleChangeFile}
                        style={{ width: "100%", display: "none", height: "100%" }}
                      />
                      <label htmlFor="img">Attache Book File</label>
                      <BsPaperclip style={{ fontSize: "2rem" }} />
                    </div>
                  </div>
                </div>
                <div className="button-details">
                  <div className="add-book">
                    <button type="submit" style={{ color: "white", backgroundColor: "#D60000" }}>
                      Add Book <BiBookAdd style={{ fontSize: "2rem" }} />
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AddBook;
