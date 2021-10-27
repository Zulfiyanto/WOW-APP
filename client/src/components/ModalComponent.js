import { Modal, Button } from "react-bootstrap";
import { BsPaperclip } from "react-icons/bs";

export const ModalRegist = (props) => {
  const OnClickRegist = () => {
    return props.hideRegist;
  };

  return (
    <Modal show={props.showRegist} onHide={props.hideRegist}>
      <Modal.Title className="modal-signup">Sign Up</Modal.Title>
      <Modal.Body>
        {props.message && props.message}
        <form onSubmit={props.submit}>
          <div className="input-box">
            <div className="input-email">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={props.email}
                onChange={props.change}
              />
            </div>
            <div className="input-password">
              <input
                type="password"
                name="password"
                id="pass"
                placeholder="Password"
                value={props.pass}
                onChange={props.change}
              />
            </div>
            <div className="input-fullname">
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={props.name}
                onChange={props.change}
              />
            </div>
            <Button
              className="modal-button"
              variant="primary"
              type="submit"
              onClick={props.hideRegist}
            >
              Sign Up
            </Button>
            <div className="already-account">
              Already have an account ? Klik
              <span onClick={() => OnClickRegist()}>Here</span>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const ModalLogin = (props) => {
  return (
    <Modal show={props.showLogin} onHide={props.hideLogin}>
      <Modal.Title className="modal-signup">Sign In</Modal.Title>
      <Modal.Body>
        {props.message && props.message}
        <form onSubmit={props.submit}>
          <div className="input-box">
            <div className="input-email">
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={props.email}
                onChange={props.change}
              />
            </div>
            <div className="input-password">
              <input
                type="password"
                name="password"
                id="pass"
                value={props.password}
                placeholder="Password"
                onChange={props.change}
              />
            </div>

            <Button className="modal-button" variant="primary" type="submit">
              Sign Up
            </Button>

            <div className="already-account">
              Don't have an account ? Klik
              <span href="#" onClick={props.showRegist}>
                Here
              </span>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const ModalProfile = (props) => {
  const OnClickRegist = () => {
    return props.hideRegist;
  };

  console.log(props.preview);

  return (
    <Modal size="lg" show={props.show} onHide={props.hide}>
      <Modal.Title className="modal-profile">Profile</Modal.Title>
      <Modal.Body>
        <form onSubmit={props.submit}>
          <div className="input-box-profile">
            <div className="input-email">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={props.email}
                onChange={props.OnChange}
              />
            </div>
            <div className="input-gender">
              <input type="radio" name="gender" id="pass" value="male" onChange={props.OnChange} />
              <label for="html"> Male</label>
              <input type="radio" name="gender" value="Female" onChange={props.OnChange} />
              <label for="html"> Female</label>
            </div>
            <div className="input-phone">
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={props.phone}
                onChange={props.OnChange}
              />
            </div>
            <div className="input-address">
              <input
                type="textarea"
                placeholder="Address"
                name="address"
                value={props.address}
                onChange={props.OnChange}
              />
            </div>
            {props.preview && (
              <div className="image-preview">
                <img
                  src={props.preview}
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
                name="profile_file"
                id="imgs"
                onChange={props.OnChange}
                style={{ width: "100%", display: "none", height: "100%" }}
              />
              <label htmlFor="imgs">Attache Book Cover</label>
              <BsPaperclip style={{ fontSize: "2rem" }} />
            </div>
            <Button className="modal-button" variant="primary" type="submit" onClick={props.hide}>
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const ModalImage = (props) => {
  return (
    <Modal size="lg" show={props.show} onHide={props.hide}>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        <img src={props.image}></img>
      </Modal.Body>
    </Modal>
  );
};
