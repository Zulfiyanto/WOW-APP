import "./style/SubscribeSection.css";
import Logo from "../assets/img/Wow.png";
import Clip from "../assets/img/clip.svg";
import { useContext, useState } from "react";
import { user } from "../database/data";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
const SubscribeSection = (props) => {
  const [state] = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    user_id: state.user.id,
    transfer_proof: "",
  });
  console.log(state);

  console.log(preview);
  const OnSubscribeChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const OnSubscribeSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("user_id", form.user_id);
      formData.set("transfer_proof", form.transfer_proof[0], form.transfer_proof[0].name);

      await API.post("/transaction", formData, config);

      props.setShowPopUp(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="subscribe-section">
      <form onSubmit={OnSubscribeSubmit}>
        <div className="subs-body">
          <div className="title-subs">Premium</div>
          <div className="desc-subs">
            Pay now and access all the latest books from
            <img src={Logo} alt="logo" />
          </div>
          <div className="telp-subs">
            <img src={Logo} alt="telp" />: 0981312323
          </div>
          <div className="input-subs">
            <input type="text" placeholder="Input your account number" />
          </div>
          {preview && (
            <div>
              <img
                className="mt-5"
                src={preview}
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
                alt="preview"
              />
            </div>
          )}
          <div className="upload-subs">
            <input
              type="file"
              name="transfer_proof"
              id="img"
              style={{ display: "none" }}
              onChange={OnSubscribeChange}
            />
            <label htmlFor="img">Attache proof of transfer</label>
            <img src={Clip} alt="attach" />
          </div>
          <div className="btn-subs">
            <button type="submit">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SubscribeSection;
