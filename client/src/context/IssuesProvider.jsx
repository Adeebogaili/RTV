import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const IssuesContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function IssuesProvider(props) {
  const initState = {
    issues: [],
  };

  const [issueState, setIssueState] = useState(initState);

  const initPublic = {
    publicIssues: [],
  };

  const [publicIssues, setPublicIssues] = useState(initPublic);

  // Add user issue
  function addIssue(newIssue) {
    userAxios
      .post('/api/issue', newIssue)
      .then((res) => {
        setIssueState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err));
  }

  // Get user issues
  const getUserIssues = async (userId) => {
    try {
      const response = await userAxios.get(`/api/issue/user/:id`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIssueState((prevState) => ({
        ...prevState,
        issues: response.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Get public issues
  const getpublicIssues = async () => {
    try {
      const response = await userAxios.get('/api/issue/');
      setPublicIssues((prevState) => ({
        ...prevState,
        publicIssues: response.data,
      }));
    } catch (err) {
      console.log(err.resposne.errMsg);
    }
  };

  // Delete user issue
  function deleteIssue(issueId) {
    userAxios
      .delete(`/api/issue/${issueId}`)
      .then((res) => {
        setIssueState((prevState) => ({
          ...prevState,
          issues: prevState.issues.filter((issue) => issue._id !== issueId),
        }));
      })
      .catch((err) => console.log(err));
  }

  // Edit user issue
  function editIssue(issueId, updatedIssue) {
    userAxios
      .put(`/api/issue/${issueId}`, updatedIssue)
      .then((res) => {
        setIssueState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) =>
            issue._id === issueId ? res.data : issue
          ),
        }));
      })
      .catch((err) => console.log(err));
  }

  // like issue
  function likeIssue(issueId) {
    userAxios
      .put(`/api/issue/like/${issueId}`)
      .then((res) => {
        // find the index of the issue to update
        const issueIndex = issueState.issues.findIndex(
          (issue) => issue._id === issueId
        );

        // create a new copy of the issues array with the updated issue
        const updatedIssues = [
          ...issueState.issues.slice(0, issueIndex),
          {
            ...issueState.issues[issueIndex],
            likes: res.data,
          },
          ...issueState.issues.slice(issueIndex + 1),
        ];

        // update the state of issueState with the new array of issues
        setIssueState((prevState) => ({
          ...prevState,
          issues: updatedIssues,
        }));

        // fetch updated public issues and update the state
        getpublicIssues();
      })
      .catch((err) => console.log(err));
  }

  // dislike Issue
  function dislikeIssue(issueId) {
    userAxios
      .put(`/api/issue/unlike/${issueId}`)
      .then((res) => {
        setIssueState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map((issue) => {
            if (issue._id === issueId) {
              return {
                ...issue,
                likes: res.data,
              };
            }
            return issue;
          }),
        }));

        // fetch updated public issues and update the state
        getpublicIssues();
      })
      .catch((err) => console.log(err));
  }

  // Call getUserIssues and getpublicIssues on mount
  useEffect(() => {
    getpublicIssues();
  }, []);

  return (
    <IssuesContext.Provider
      value={{
        ...issueState,
        ...publicIssues,
        addIssue,
        deleteIssue,
        editIssue,
        getUserIssues,
        getpublicIssues,
        likeIssue,
        dislikeIssue,
      }}
    >
      {props.children}
    </IssuesContext.Provider>
  );
}
