import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CloseMenu } from '../../assets/x.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
import Logo from '../Logo/Logo';
import './navbar.css';

export default function Navbar(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { logout, token } = props;

  return (
    <div className='header'>
      <div className='logo-nav'>
        <Logo />
        <ul className={click ? 'nav-options active' : 'nav-options'}>
          {' '}
          {token && (
            <li className='option' onClick={closeMobileMenu}>
              <Link className='link ' to='/'>
                {' '}
                <i className='fa-solid fa-house'> </i>
              </Link>
            </li>
          )}{' '}
          <li className='option' onClick={closeMobileMenu}>
            <Link className='link ' to='/public'>
              {' '}
              <i className='fa-sharp fa-solid fa-people-group'> </i>
            </Link>
          </li>{' '}
          {token && (
            <li className='option' onClick={closeMobileMenu}>
              <Link className='link ' to='profile'>
                {' '}
                <i className='fa-solid fa-user'> </i>
              </Link>
            </li>
          )}{' '}
          {!token && (
            <li className='option mobile-option' onClick={closeMobileMenu}>
              <Link className='link sign-up' to='/auth'>
                LOG IN{' '}
              </Link>{' '}
            </li>
          )}{' '}
          {token && (
            <li className='option mobile-option' onClick={closeMobileMenu}>
              <Link className='link sign-up ' to='/home'>
                <button className='logout-btn' onClick={logout}>
                  LOG OUT{' '}
                </button>{' '}
              </Link>{' '}
            </li>
          )}{' '}
        </ul>{' '}
      </div>{' '}
      <ul className='signin-up'>
        {' '}
        {!token && (
          <li onClick={closeMobileMenu}>
            <Link className='link signup-btn ' to='/auth'>
              LOG IN{' '}
            </Link>{' '}
          </li>
        )}{' '}
        {token && (
          <button className='logout-btn' onClick={logout}>
            LOG OUT{' '}
          </button>
        )}{' '}
      </ul>{' '}
      <div className='mobile-menu' onClick={handleClick}>
        {' '}
        {click ? (
          <CloseMenu className='menu-icon' />
        ) : (
          <MenuIcon className='menu-icon' />
        )}{' '}
      </div>{' '}
    </div>
    // <div className="navbar">
    //   <Link to="/">Home</Link>
    //   <Link to="/public">Public</Link>
    //   { token && <Link to="/profile">Profile</Link> }
    //   { token && <button onClick={logout}>Logout</button> }
    //   { !token && <Link to="/auth">Login</Link> }
    // </div>
  );
}
