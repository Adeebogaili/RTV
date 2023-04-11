import React, { useContext } from "react";
import './styles/index.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Auth from "./components/Auth/Auth.js";
import Profile from "./pages/profile/Profile.jsx";
import Public from "./pages/public/Public.jsx";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute.jsx";
import { UserContext } from "./context/UserProvider.jsx";


// components
import Footer from "./components/Footer/Footer.jsx";

// pages
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/notfound/NotFound";

export default function App() {
  
  const { token, logout } = useContext(UserContext);

  return (
    <div className="app">
      <Navbar logout={logout} token={token}/>
      <Routes>

         {token && <Route path="/" element={<Home />} />}
         {!token && <Route path="/" element={<Navigate to="/public" />} />}

        { !token &&
          <Route path="/auth" element={<Auth />} />
        }
        { token &&
          <Route path="/auth" element={<Navigate to="/" />} />
        }
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/public">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute token={token} redirectTo="/public">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public"
          element={<Public />}
        />
        <Route path="/*" element={
           <ProtectedRoute token={token} redirectTo="/public">
           <NotFound />
         </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}
