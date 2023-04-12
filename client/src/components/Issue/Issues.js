import React, { useState, useContext, useEffect } from 'react';
import Issue from './Issue';
import Comments from '../Comment/Comments';
import CommentForm from '../Comment/CommentForm';
import { CommentContext } from '../../context/CommentProvider';
import { IssuesContext } from '../../context/IssuesProvider';
import { UserContext } from '../../context/UserProvider';
import './issue.css';

export default function Issues({ userId }) {
  const { comments, getComments } = useContext(CommentContext);

  const { getUserIssues, issues, likeIssue, dislikeIssue } =
    useContext(IssuesContext);

  const {
    user: { username, _id },
    token,
  } = useContext(UserContext);

  const [currentIssueId, setCurrentIssueId] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUserIssues(userId);
      if (currentIssueId) {
        getComments(currentIssueId);
        setShowComments(true);
      } else {
        setShowComments(false);
      }
    };
    fetchData();
  }, [userId, currentIssueId]);

  return (
    <div className='issue-list'>
      {issues?.map((issue) => (
        <div className='comment-section' key={issue._id}>
          <Issue {...issue} />
          <span className='likes-counter'>
            {issue.likes.length === 0 ? (
              ''
            ) : (
              <i className='fa-solid fa-thumbs-up'></i>
            )}

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
              } else if (userLike.length === 0 && otherLikes === 1) {
                return `${issue.likes?.map((like) => `${like.username}`)}`;
              } else if (userLike.length > 0 && otherLikes === 1) {
                return `${issue.likes
                  ?.map((like) => `${like.username}`)
                  .join(' and ')}`;
              } else {
                return `${otherLikes}`;
              }
            })()}
          </span>
          <div className='comment-btn-wrapper'>
            <div className='likes-btn-wrapper'>
              <button onClick={() => likeIssue(issue._id)}>
                <span>
                  <i className='fa-regular fa-thumbs-up'></i>
                </span>
              </button>
              <button onClick={() => dislikeIssue(issue._id)}>
                <span>
                  <i className='fa-regular fa-thumbs-down'></i>
                </span>
              </button>
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
}
