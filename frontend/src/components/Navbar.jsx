import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  User,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  const getRoleBadgeColor = () => {
    const colors = {
      author: "#059669",
      publisher: "#7c3aed",
      reader: "#2563eb",
      admin: "#dc2626",
    };
    return colors[user?.role] || "#2563eb";
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
              <li className="profile-menu-item" ref={dropdownRef}>
                <button
                  className="btn-profile-trigger"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="profile-avatar-sm">
                    {user?.profilePicture &&
                    user.profilePicture !== "default-avatar.png" ? (
                      <img src={user.profilePicture} alt={user.name} />
                    ) : (
                      <span>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                    )}
                  </div>
                  <span className="profile-name-short">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`chevron ${profileOpen ? "open" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">
                        {user?.profilePicture &&
                        user.profilePicture !== "default-avatar.png" ? (
                          <img src={user.profilePicture} alt={user.name} />
                        ) : (
                          <span>
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                      <div className="dropdown-user-info">
                        <span className="dropdown-name">{user?.name}</span>
                        <span
                          className="dropdown-role-badge"
                          style={{ background: getRoleBadgeColor() }}
                        >
                          {user?.role}
                        </span>
                      </div>
                    </div>

                    <div className="dropdown-divider" />

                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      <User size={15} />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="dropdown-item"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      <Settings size={15} />
                      <span>Edit Profile</span>
                    </Link>

                    <div className="dropdown-divider" />

                    <button
                      className="dropdown-item danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
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
