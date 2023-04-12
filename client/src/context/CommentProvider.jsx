import React, { useState } from 'react';
import axios from 'axios';

export const CommentContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default function CommentProvider(props) {

    const initState = {
        comments: [],
        errMsg: ''
    };

    const [commentState, setCommentState] = useState(initState);
    
    // Add comment to an issue post
    function addComment(issueId, newComment) {
        userAxios.post(`/api/comment/${issueId}`, newComment)
        .then(res => 
            {
                setCommentState(prevState => ({
                    ...prevState,
                    comments: [...prevState.comments, res.data]
                }));
            })
            .catch(err => console.log(err));
        }

    // Get all comments for an issue post
    const getComments = async (issueId) => {
        try {
           const response = await userAxios.get(`/api/comment/${issueId}`)
            setCommentState(prevState => ({
                    ...prevState,
                    comments: response.data
                }))
        } catch (err) {
            console.log(err.response.data.errMsg);
        }
    }
    
    // Edit a comment on an issue post
    function editComment(issueId, commentId, updatedComment) {
        userAxios.put(`/api/comment/${issueId}/${commentId}`, updatedComment)
            .then(res => {
                setCommentState(prevState => ({
                    ...prevState,
                    comments: prevState.comments.map(comment => comment._id === commentId ? res.data : comment)
                }));
            })
            .catch(err => console.log(err));
    }

    // Delete a comment on an issue post
    function deleteComment(issueId, commentId) {
        userAxios.delete(`/api/comment/${issueId}/${commentId}`)
            .then(res => {
                setCommentState(prevState => ({
                    ...prevState,
                    comments: prevState.comments.filter(comment => comment._id !== commentId)
                }));
            })
            .catch(err => console.log(err));
    }

    // Reset comment error message
    function resetCommentErr() {
        setCommentState(prevState => ({
            ...prevState,
            errMsg: ''
        }));
    }

    // Set comment error message
    function setCommentErr(errMsg) {
        setCommentState(prevState => ({
            ...prevState,
            errMsg
        }));
    }

   return (
        <CommentContext.Provider
            value={{
                ...commentState,
                addComment,
                editComment,
                deleteComment,
                getComments,
                resetCommentErr,
                setCommentErr,
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}
