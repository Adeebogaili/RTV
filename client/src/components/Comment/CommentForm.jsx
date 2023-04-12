import React, { useState, useContext } from 'react';
import { CommentContext } from '../../context/CommentProvider';
import { UserContext } from '../../context/UserProvider';
import "./comment.css"

function CommentForm(props) {

  const { issueId } = props;

  const initInputs = {
    comment: ""
  };

  const [inputs, setInputs] = useState(initInputs);

  const { addComment } = useContext(CommentContext);

  const {
    user: {
      username
    },
    token,
  } = useContext(UserContext);

  function handleChange(e){
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  }

  function handleSubmit(e){
    e.preventDefault();
    addComment(issueId, inputs);
    setInputs(initInputs);
  }

  const { comment } = inputs;

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  if (!token) {
    return null; // or render some other component instead
  }

  return(
    <div className="comment-form-wrapper">
      <div className="profile-pic">{firstLetter}</div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type='text'
          name='comment'
          value={comment}
          onChange={handleChange}
          placeholder='Write a comment...'
        />
        <button className="comment-submit-btn"><i className="fa-regular fa-paper-plane"></i></button>
      </form>
    </div>
  );
}

export default CommentForm;

