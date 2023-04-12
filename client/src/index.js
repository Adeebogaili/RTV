import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Providers 
import UserProvider from './context/UserProvider';
import IssuesProvider from './context/IssuesProvider';
import CommentProvider from './context/CommentProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <IssuesProvider>
      <UserProvider>
        <CommentProvider>
         <App />
        </CommentProvider>
      </UserProvider>
    </IssuesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
