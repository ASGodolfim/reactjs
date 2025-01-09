import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import { Navigate } from 'react-router-dom'

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';

function Navbar() {
  const { user } = useAuthValue()
  const { logout } = useAuthentication()

  const handleLogout = () => {
    logout();
    return <Navigate to="/" />;
  };

  return (
    <nav>
      <NavLink to={'/'} className={style.brand}>
        <span>Mini</span>
        <span className={`${style.uppercase} ${style.bold}`}>Blog</span>
      </NavLink>
      <ul className={style.link_list}>
        <li>
          <NavLink to={'/'} className={({ isActive }) => (isActive ? style.active : style.inactive)}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/about'} className={({ isActive }) => (isActive ? style.active : style.inactive)}>About</NavLink>
        </li>
        {!user && (
        <>
            <li>
                <NavLink to={'/signup'} className={style.active}>Sign Up</NavLink>
            </li>
            <li>
                <NavLink to={'/login'} className={({ isActive }) => (isActive ? style.active : style.inactive)}>Login</NavLink>
            </li>
        </>
        )}
        {user && 
        <>
            <li>
                <NavLink to={'/account'} className={({ isActive }) => (isActive ? style.active : style.inactive)}>Account</NavLink>
            </li>
            <li>
                <NavLink to={'/posts/create'} className={({ isActive }) => (isActive ? style.active : style.inactive)}>New Post</NavLink>
            </li>
            <li>
                <button onClick={handleLogout} className={style.logout}>Log out</button>
            </li>
        </>}
      </ul>
    </nav>
  );
}

export default Navbar;