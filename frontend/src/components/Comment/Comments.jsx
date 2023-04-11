import React, { useContext, useEffect } from 'react';
import Comment from './Comment';
import "./comment.css"
import { CommentContext } from '../../context/CommentProvider';

function Comments({ issueId, comments}) {

  const {
    getComments,
  } = useContext(CommentContext)

  useEffect(() => {
    getComments(issueId)
  }, [issueId])

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment {...comment} key={comment._id} issueId={issueId} />
      ))}
    </div>
  );
}

export default Comments;

