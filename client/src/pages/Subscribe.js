import { useState } from "react";
import { Col, Container, Row, Modal } from "react-bootstrap";
// Import Style
import "./Home.css";
// Import Components
import ProfileSide from "../components/ProfileSideBar";
import SubscribeSection from "../components/SubscribeSection";

const Subscribe = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => setShowPopUp(true);
  const handleHidePopUp = () => setShowPopUp(false);
  console.log(showPopUp);

  return (
    <Container className="padding-container" fluid="true">
      <Row>
        <Col md={2}>
          <ProfileSide />
        </Col>
        <Col md={10}>
          <SubscribeSection
            setShowPopUp={(showPopUp) => setShowPopUp(showPopUp)}
            hide={handleShowPopUp}
          />
        </Col>
      </Row>
      <Modal show={showPopUp} onHide={handleHidePopUp} size="lg">
        <div className="popup-title-success">
          Thank you for subscribing to premium, your premium package will be active after our admin
          approves your transaction, thank you
        </div>
      </Modal>
    </Container>
  );
};
export default Subscribe;
