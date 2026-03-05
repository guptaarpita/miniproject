import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpen />
          <span>BookConnect</span>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" onClick={() => setIsOpen(false)}>
              Books
            </Link>
          </li>
          <li>
            <Link to="/authors" onClick={() => setIsOpen(false)}>
              Authors
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="btn-login"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="btn-login">Login</button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="btn-register">Register</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
