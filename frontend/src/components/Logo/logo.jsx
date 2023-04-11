import React from 'react'
import { Link } from "react-router-dom";
import "../styles/navbar.css"; 

const Logo = () => {
  return (
    <div className="logo-container">
          <Link to="/">
            <div className="logo">
              <h3 className="logo-title">VIP</h3>
              <span className=" pol politics-1">pol</span>
              <span className=" pol politics-2">i</span>
              <span className=" pol politics-1">t</span>
              <span className=" pol politics-3">i</span>
              <span className=" pol politics-1">cs</span>
            </div>
          </Link>
        </div>
  )
}

export default Logo