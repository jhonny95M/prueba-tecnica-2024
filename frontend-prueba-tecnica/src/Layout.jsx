import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };
  const payload = token ? parseJwt(token) : null;
  const username = payload ? payload.unique_name : '';
//   const { username } = token ? JSON.parse(atob(token.split('.')[1])) : { username: '' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <div className="header-username">Welcome, {username}</div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="layout-body">
        <nav className="layout-menu">
          <ul>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
        <main className="layout-content">
        <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;