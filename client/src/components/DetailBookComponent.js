import "./style/DetailBookSection.css";
import { BsBookmarkFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../config/api";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
const DetailBookSection = () => {
  // State
  let history = useHistory();
  const [state] = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [hidden, setHidden] = useState(false);
  let { id } = useParams();

  // Function
  const HiddenButton = async () => {
    try {
      const data = await API.get("/my-list/" + state.user.id);
      const checkData = data.data.data.list.filter((item) => {
        return item.books?.id === +id;
      });
      console.log(checkData);
      checkData.length > 0 ? setHidden(true) : setHidden(false);
    } catch (error) {
      console.log(error);
    }
  };

  const OnAddMyList = async () => {
    try {
      const body = {
        book_id: id,
      };
      await API.post("/my-list", body);
    } catch (error) {
      console.log(error);
    }
    history.push("/Profile");
  };

  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  const OnReadBook = () => {
    history.push("/Read/" + id);
  };

  // UseEffect
  useEffect(() => {
    getBook();
    HiddenButton();
  }, []);

  return (
    <div className="right-section">
      <div className="info-box">
        <div className="image-info">
          <img src={book?.cover} alt="" rounded />
        </div>
        <div className="text-infos">
          <div className="title-info">{book?.title}</div>
          <div className="writer-info">{book?.author}</div>
          <div className="label-info">Publication date</div>
          <div className="result-info">{book?.date}</div>
          <div className="label-info">Pages</div>
          <div className="result-info">{book?.pages}</div>
          <div className="label-info" style={{ color: "red" }}>
            ISBN
          </div>
          <div className="result-info">{book?.isbn}</div>
        </div>
      </div>

      <div className="desc-book">
        <div className="title">About This Book</div>
        <div className="description">{book?.about}</div>
      </div>
      <div className="button-detail">
        <div className="add-btn">
          {hidden ? null : (
            <button onClick={OnAddMyList} style={{ color: "white", backgroundColor: "#D60000" }}>
              Add My List <BsBookmarkFill />
            </button>
          )}
        </div>
        <div className="read-btn">
          <button style={{ color: "black", backgroundColor: "#CDCDCDB2" }} onClick={OnReadBook}>
            Read Book <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailBookSection;
