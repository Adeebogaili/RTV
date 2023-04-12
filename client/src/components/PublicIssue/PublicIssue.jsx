import React from 'react';
import moment from 'moment';

const PublicIssue = (props) => {
  const { title, description, imgUrl, user, createdAt } = props;

  const firstLetter = user?.username.charAt(0).toUpperCase();
  const usernameCased =
    user?.username.charAt(0).toUpperCase() +
    user?.username.slice(1).toLowerCase();

  const formattedTime = moment(createdAt).fromNow();

  return (
    <div className='issue-container'>
      <div>
        <div className='user-info'>
          <div className='profile-pic'>{firstLetter}</div>
          <div className='name-time'>
            <div>
              <h3>{usernameCased}</h3>
              <p>{formattedTime}</p>
            </div>
          </div>
        </div>
        <div className='issue-wrapper'>
          <div className='issue-div'>
            <h3 className='issue-title'>{title}</h3>
            <p className='issue-des'>{description}</p>
            <img className='issue-img' src={imgUrl} alt={title} width={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicIssue;
