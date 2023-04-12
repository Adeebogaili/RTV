import React, { useContext } from 'react'
import IssueForm from '../../components/Issue/IssueForm'
import Issues from "../../components/Issue/Issues"
import { UserContext } from '../../context/UserProvider.jsx'
import { IssuesContext } from '../../context/IssuesProvider'
import "./home.css"

const Home = () => {
  const { 
    user: {
       username,
       _id
     },
    token,
  } = useContext(UserContext)

  const {
    addIssue
  } = useContext(IssuesContext)

  const firstLetter = token && username ? username.charAt(0).toUpperCase() : '';
  const usernameCased = username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : '';
  
  return (
    <div className="home">
      <div className="post">
        <div className="profile-pic">{firstLetter}</div>
        <div className="post-wrapper">
          <h3 className="issue-question">What's on your mind, {usernameCased}?</h3>
          <IssueForm addIssue={addIssue} />
        </div>
      </div>
      <div className="issues-wrapper">
          <Issues userId={_id}/>
      </div>
    </div>
  )
}

export default Home