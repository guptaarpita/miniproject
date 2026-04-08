import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Edit2, Shield, Globe, Calendar, CheckCircle } from "lucide-react";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ReaderProfileContent from "../../components/profile/ReaderProfileContent.jsx";
import AuthorProfileContent from "../../components/profile/AuthorProfileContent.jsx";
import PublisherProfileContent from "../../components/profile/PublisherProfileContent.jsx";
import "../../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, isAuthor, isPublisher, isReader, logout } = useAuth();
  const navigate = useNavigate();

  const getRoleColor = () => {
    if (isAuthor) return "#059669";
    if (isPublisher) return "#7c3aed";
    return "#2563eb";
  };

  const getRoleLabel = () => {
    if (isAuthor) return "Author";
    if (isPublisher) return "Publisher";
    return "Reader";
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Jan 2026";

  return (
    <div className="profile-page">
      {/* Cover + Avatar header */}
      <div
        className="profile-cover"
        style={{
          background: `linear-gradient(135deg, ${getRoleColor()}22 0%, ${getRoleColor()}44 100%)`,
        }}
      >
        <div className="profile-cover-inner container">
          <ProfileAvatar user={user} size="lg" />
          <div className="profile-hero-info">
            <div className="profile-name-row">
              <h1 className="profile-name">{user?.name}</h1>
              {user?.isVerified && (
                <CheckCircle size={20} className="profile-verified" />
              )}
            </div>
            <span
              className="profile-role-badge"
              style={{ background: getRoleColor() }}
            >
              {getRoleLabel()}
            </span>
            {user?.bio && <p className="profile-bio">{user.bio}</p>}
            <div className="profile-meta-row">
              <span className="profile-meta-item">
                <Calendar size={13} /> Joined {memberSince}
              </span>
              <span className="profile-meta-item">
                <Globe size={13} /> {user?.email}
              </span>
            </div>
          </div>
          <button
            className="btn-edit-profile"
            onClick={() => navigate("/profile/edit")}
          >
            <Edit2 size={15} />
            Edit Profile
          </button>
          <button
              className="btn-logout-profile"
              onClick={logout}
          >
              Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container profile-body">
        {isReader && <ReaderProfileContent user={user} />}
        {isAuthor && <AuthorProfileContent user={user} />}
        {isPublisher && <PublisherProfileContent user={user} />}
      </div>
    </div>
  );
};

export default ProfilePage;
