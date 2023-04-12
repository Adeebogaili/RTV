import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import "./issue.css";

// Contexts
import { UserContext } from "../../context/UserProvider";
import { IssuesContext } from "../../context/IssuesProvider";

export default function Issue(props) {
  const { title, description, imgUrl, _id, createdAt } = props;

  const {
    token,
    user: { username },
  } = useContext(UserContext);

  const { editIssue, deleteIssue } = useContext(IssuesContext);

  const [issue, setIssue] = useState({
    title,
    description,
    imgUrl,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    setIsEditing(!isEditing);
  };

  function handleEdit() {
    setIsEditing(!isEditing);
    handleShow();
  }

  function handleDelete() {
    deleteIssue(_id);
  }

  function handleSave() {
    editIssue(_id, issue);
    setIsEditing(false);
    handleClose();
  }

  // Capitalize first letter
  const firstLetter = token && username ? username.charAt(0).toUpperCase() : '';
  const usernameCased = username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : '';


  // Calculate the time elapsed since the issue was posted
  const ONE_MINUTE = 60;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  let timeElapsedStr = "";
  const timeElapsed = Math.floor((Date.now() - new Date(createdAt)) / 1000); // in seconds

  if (timeElapsed < ONE_MINUTE) {
    timeElapsedStr = `${timeElapsed} seconds ago`;
  } else if (timeElapsed < ONE_HOUR) {
    const minutes = Math.floor(timeElapsed / ONE_MINUTE);
    timeElapsedStr = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (timeElapsed < ONE_DAY) {
    const hours = Math.floor(timeElapsed / ONE_HOUR);
    timeElapsedStr = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(timeElapsed / ONE_DAY);
    timeElapsedStr = `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="issue-container">
      <div>
        <div className="user-info">
        <div className="profile-pic">{firstLetter}</div>
        <div className="name-time">
          <div>
            <h3>{usernameCased}</h3>
            <p>{timeElapsedStr}</p>
          </div>
          <div className="dropdown">
            <Dropdown drop="start">
              <Dropdown.Toggle
                className="text-dark bg-transparent border-0"
                variant="success"
                id="dropdown-basic"
                size="lg"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        </div>
        <div className="issue-wrapper">
          <div className="issue-div">
            <h3 className="issue-title">{title}</h3>
            <p className="issue-des">{description}</p>
            <img className="issue-img" src={imgUrl} alt={title} width={300} />
          </div>
        </div>
      </div>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="popup-input"
              value={issue.title}
              onChange={(e) => setIssue({ ...issue, title: e.target.value })}
              placeholder="title"
            />
            <input
              className="popup-input"
              value={issue.imgUrl}
              onChange={(e) => setIssue({ ...issue, imgUrl: e.target.value })}
              placeholder="ImgUrl"
            />
            <textarea
              className="popup-textarea"
              value={issue.description}
              rows="6"
              onChange={(e) =>
                setIssue({ ...issue, description: e.target.value })
              }
              placeholder="Description"
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Close</button>
            <button onClick={handleSave}>Save</button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
