import { Col, Container, Row } from "react-bootstrap";
// Import Style
import "./Home.css";
// Import Components
import ProfileSide from "../components/ProfileSideBar";
import ProfileSection from "../components/ProfileSection";

const Profile = () => {
  return (
    <Container className="padding-container" fluid="true">
      <Row>
        <Col md={2}>
          <ProfileSide />
        </Col>
        <Col md={10}>
          <ProfileSection />
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;
