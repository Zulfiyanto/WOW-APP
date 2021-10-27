import { Col, Container, Row } from "react-bootstrap";
// Import Style
import "./Home.css";
// Import Components
import ProfileSide from "../components/ProfileSideBar";
import DetailBookSection from "../components/DetailBookComponent";

const DetailBook = () => {
  return (
    <Container className="padding-container" fluid="true">
      <Row>
        <Col md={2}>
          <ProfileSide />
        </Col>
        <Col md={10}>
          <DetailBookSection />
        </Col>
      </Row>
    </Container>
  );
};
export default DetailBook;
