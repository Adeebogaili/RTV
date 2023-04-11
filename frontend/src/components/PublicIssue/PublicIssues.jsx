import React, { useState, useContext, useEffect } from 'react';
import PublicIssue from './PublicIssue';
import { CommentContext } from '../../context/CommentProvider';
import { IssuesContext } from '../../context/IssuesProvider';
import { UserContext } from '../../context/UserProvider';

import CommentForm from '../Comment/CommentForm';
import Comments from '../Comment/Comments';

const PublicIssues = ({ publicIssues }) => {
  const { getComments, comments } = useContext(CommentContext);

  const { likeIssue, dislikeIssue } = useContext(IssuesContext);

  const {
    user: { username, _id },
    token,
  } = useContext(UserContext);

  const userId = _id;

  const [currentIssueId, setCurrentIssueId] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (currentIssueId) {
      getComments(currentIssueId);
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  }, [currentIssueId]);

  return (
    <div className='publicIssues-list'>
      {publicIssues?.map((issue) => (
        <div className='comment-section' key={issue._id}>
          <PublicIssue {...issue} />
          <span className='likes-counter'>
            { issue.likes.length === 0 ? '' : <i className='fa-solid fa-thumbs-up'></i>}

            {/*  Using IIFE (Immediately Invoked Function Expression) */}
            {(() => {
              const userLike = issue.likes.filter(
                (like) => like.user === userId
              );
              const otherLikes = issue.likes.length - userLike.length;
              if (userLike.length > 0 && otherLikes > 2) {
                return `You and ${otherLikes} others`;
              } else if (userLike.length > 0 && otherLikes === 0) {
                return `${username}`;
              } else if (userLike.length === 0 && otherLikes === 0) {
                return '';
              }else if (userLike.length === 0 && otherLikes === 1) {
                return `${issue.likes?.map(like => `${like.username}`)}`;
              } else if (userLike.length > 0 && otherLikes === 1) {
                return `${issue.likes?.map(like => `${like.username}`).join(' and ')}`;
              } else {
                return `${otherLikes}`;
              }
            })()}
          </span>

          <div className='comment-btn-wrapper'>
            <div className='likes-btn-wrapper'>
              {
                <button onClick={() => likeIssue(issue._id)}>
                  <span>
                    <i className='fa-regular fa-thumbs-up'></i>
                  </span>
                </button>
              }
              {
                <button onClick={() => dislikeIssue(issue._id)}>
                  <span>
                    <i className='fa-regular fa-thumbs-down'></i>
                  </span>
                </button>
              }
            </div>
            <button
              onClick={() =>
                setCurrentIssueId(
                  currentIssueId === issue._id ? null : issue._id
                )
              }
            >
              {currentIssueId === issue._id ? (
                <span>
                  <i className='fa-regular fa-comment'></i> Comments{' '}
                  {comments.length}
                </span>
              ) : (
                <span>
                  <i className='fa-regular fa-comment'></i> Comment
                </span>
              )}
            </button>
          </div>
          {currentIssueId === issue._id && (
            <>
              <CommentForm issueId={issue._id} />
              {showComments && (
                <Comments comments={comments} issueId={issue._id} />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PublicIssues;
