// import { useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { API } from "../config/api";
import { ModalImage } from "./ModalComponent";
import "./style/Table.css";
const TableComponent = () => {
  const [transaction, setTransaction] = useState([]);
  const [reload, setReload] = useState(false);

  const [showImage, setShowImage] = useState(false);
  const handleShowImage = () => setShowImage(true);
  const handleCloseImage = () => setShowImage(false);

  const handlerTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      setTransaction(response.data.data.transactions);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproved = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        payment_status: "Approve",
        user_status: "active",
        id,
      };

      const body = JSON.stringify(data);

      await API.patch("/transaction/" + id, body, config);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        payment_status: "Cancel",
        user_status: "Not active",
        id,
      };

      const body = JSON.stringify(data);

      await API.patch("/transaction/" + id, body, config);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlerTransaction();
  }, [reload]);

  const paymentStatus = (no) => {
    if (no === "Approve") {
      return <span style={{ color: "#0ACF83" }}>Approve</span>;
    } else if (no === "Pending") {
      return <span style={{ color: "#F7941E" }}>Pending</span>;
    } else if (no === "Cancel") {
      return <span style={{ color: "#FF0742" }}>Cancel</span>;
    }
  };

  return (
    <div className="table-section">
      <div className="title">Incoming Transaction</div>
      <div className="table-box">
        <Table striped hover>
          <thead className="borderless">
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Bukti Transfer</th>
              <th>Remaining Active</th>
              <th>Status User</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {transaction.map((state, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{state.user.fullname}</td>
                <td>
                  <img
                    style={{ width: "20%" }}
                    src={state.transfer_proof}
                    onClick={handleShowImage}
                  ></img>
                  <ModalImage
                    image={state.transfer_proof}
                    show={showImage}
                    hide={handleCloseImage}
                  />
                </td>
                <td>{state.remaining_active}/day</td>
                <td>
                  {state.user_status === "active" ? (
                    <span style={{ color: "#0ACF83" }}>Active</span>
                  ) : (
                    <span style={{ color: "#FF0742" }}>Not active</span>
                  )}
                </td>
                <td>{paymentStatus(state.payment_status)}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="drop-toggle"
                      style={{ color: "#1C9CD2", fontSize: "2rem" }}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-table">
                      <Dropdown.Item
                        className="dropdown-table-success"
                        onClick={() => handleApproved(state.id)}
                      >
                        Approved
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-table-danger"
                        onClick={() => handleCancel(state.id)}
                      >
                        Cancel
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default TableComponent;
