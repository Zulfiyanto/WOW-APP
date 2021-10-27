import { Col, Container, Row } from "react-bootstrap";
// Import Style
import "./Home.css";
// Import Components
import NavbarPage from "../components/Navbar";
import TableComponent from "../components/Table";

const Transaction = () => {
  return (
    <Container className="padding-container" fluid="true">
      <Row>
        <Col md={12}>
          <NavbarPage />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="tb-section">
          <TableComponent />
        </Col>
      </Row>
    </Container>
  );
};
export default Transaction;
