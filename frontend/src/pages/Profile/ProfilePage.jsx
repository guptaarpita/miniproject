import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Star,
  Edit2,
  Shield,
  Globe,
  Twitter,
  Linkedin,
  TrendingUp,
  Clock,
  Award,
  BookMarked,
  MessageCircle,
  PenTool,
  Calendar,
  CheckCircle,
  Wallet,
  ChevronRight,
} from "lucide-react";
import "../../styles/ProfilePage.css";

// ── Reusable sub-components ──────────────────────────────────────────────────

const ProfileAvatar = ({ user, size = "lg" }) => {
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`profile-avatar profile-avatar--${size}`}>
      {user?.profilePicture && user.profilePicture !== "default-avatar.png" ? (
        <img src={user.profilePicture} alt={user.name} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

const StatBubble = ({ icon, value, label, color = "indigo" }) => (
  <div className={`stat-bubble stat-bubble--${color}`}>
    <div className="stat-bubble-icon">{icon}</div>
    <div className="stat-bubble-value">{value}</div>
    <div className="stat-bubble-label">{label}</div>
  </div>
);

const InterestTag = ({ label }) => (
  <span className="interest-tag">{label}</span>
);

// ── Role-specific profile sections ───────────────────────────────────────────

const ReaderProfileContent = ({ user }) => {
  const mockReadingHistory = [
    {
      id: 1,
      title: "The Digital Age",
      author: "Alex Mercer",
      genre: "Sci-Fi",
      rating: 5,
      date: "Mar 2026",
    },
    {
      id: 2,
      title: "Blockchain Basics",
      author: "Sarah Kim",
      genre: "Technology",
      rating: 4,
      date: "Feb 2026",
    },
    {
      id: 3,
      title: "AI Revolution",
      author: "John Smith",
      genre: "Non-Fiction",
      rating: 5,
      date: "Feb 2026",
    },
  ];

  const mockWishlist = [
    { id: 1, title: "Deep Learning Demystified", author: "Emily Chen" },
    { id: 2, title: "Smart Contracts 101", author: "Michael Brown" },
  ];

  return (
    <>
      {/* Stats */}
      <div className="profile-stats-row">
        <StatBubble
          icon={<BookOpen size={20} />}
          value="23"
          label="Books Read"
          color="indigo"
        />
        <StatBubble
          icon={<Star size={20} />}
          value="15"
          label="Reviews"
          color="yellow"
        />
        <StatBubble
          icon={<Users size={20} />}
          value="8"
          label="Following"
          color="pink"
        />
        <StatBubble
          icon={<BookMarked size={20} />}
          value="12"
          label="Wishlist"
          color="teal"
        />
      </div>

      {/* Interests */}
      {user?.interests?.length > 0 && (
        <section className="profile-section">
          <h3 className="profile-section-title">
            <Award size={16} /> Reading Interests
          </h3>
          <div className="tags-row">
            {user.interests.map((i) => (
              <InterestTag key={i} label={i} />
            ))}
          </div>
        </section>
      )}

      {/* Reading history */}
      <section className="profile-section">
        <div className="section-header-row">
          <h3 className="profile-section-title">
            <Clock size={16} /> Reading History
          </h3>
          <Link to="/books" className="see-all-link">
            See all →
          </Link>
        </div>
        <div className="book-list">
          {mockReadingHistory.map((book) => (
            <div key={book.id} className="book-list-item">
              <div className="book-cover-placeholder">
                <BookOpen size={18} />
              </div>
              <div className="book-list-info">
                <span className="book-list-title">{book.title}</span>
                <span className="book-list-author">by {book.author}</span>
                <span className="book-list-meta">
                  {book.genre} · {book.date}
                </span>
              </div>
              <div className="book-list-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < book.rating ? "star-filled" : "star-empty"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wishlist */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <BookMarked size={16} /> Wishlist
        </h3>
        <div className="wishlist-grid">
          {mockWishlist.map((book) => (
            <div key={book.id} className="wishlist-card">
              <div className="wishlist-cover">
                <BookOpen size={22} />
              </div>
              <span className="wishlist-title">{book.title}</span>
              <span className="wishlist-author">{book.author}</span>
            </div>
          ))}
          <div className="wishlist-card wishlist-card--add">
            <span className="wishlist-add-icon">+</span>
            <span className="wishlist-title">Add books</span>
          </div>
        </div>
      </section>
    </>
  );
};

const AuthorProfileContent = ({ user }) => {
  const mockBooks = [
    {
      id: 1,
      title: "The Digital Age",
      genre: "Sci-Fi",
      reads: 1243,
      rating: 4.8,
      status: "published",
    },
    {
      id: 2,
      title: "Blockchain Stories",
      genre: "Technology",
      reads: 892,
      rating: 4.5,
      status: "published",
    },
    {
      id: 3,
      title: "Draft: Untitled",
      genre: "Fiction",
      reads: 0,
      rating: 0,
      status: "draft",
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="profile-stats-row">
        <StatBubble
          icon={<BookOpen size={20} />}
          value="5"
          label="Published"
          color="indigo"
        />
        <StatBubble
          icon={<Users size={20} />}
          value="342"
          label="Followers"
          color="pink"
        />
        <StatBubble
          icon={<TrendingUp size={20} />}
          value="1.2K"
          label="Total Reads"
          color="teal"
        />
        <StatBubble
          icon={<Star size={20} />}
          value="4.7"
          label="Avg Rating"
          color="yellow"
        />
      </div>

      {/* Genre tags */}
      {user?.interests?.length > 0 && (
        <section className="profile-section">
          <h3 className="profile-section-title">
            <PenTool size={16} /> Writing Genres
          </h3>
          <div className="tags-row">
            {user.interests.map((i) => (
              <InterestTag key={i} label={i} />
            ))}
          </div>
        </section>
      )}

      {/* Books */}
      <section className="profile-section">
        <div className="section-header-row">
          <h3 className="profile-section-title">
            <BookOpen size={16} /> My Books
          </h3>
          <Link to="/upload-book" className="btn-section-action">
            + New Book
          </Link>
        </div>
        <div className="book-list">
          {mockBooks.map((book) => (
            <div key={book.id} className="book-list-item">
              <div className="book-cover-placeholder">
                <BookOpen size={18} />
              </div>
              <div className="book-list-info">
                <span className="book-list-title">{book.title}</span>
                <span className="book-list-meta">{book.genre}</span>
                {book.status === "published" && (
                  <span className="book-list-meta">
                    {book.reads} reads · ★ {book.rating}
                  </span>
                )}
              </div>
              <span className={`status-badge status-badge--${book.status}`}>
                {book.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Blockchain wallet status */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <Shield size={16} /> Blockchain Ownership
        </h3>
        <div
          className={`wallet-card ${
            user?.blockchainWallet?.isLinked ? "wallet-card--linked" : ""
          }`}
        >
          <div className="wallet-card-left">
            <Wallet size={22} />
            <div>
              <span className="wallet-label">
                {user?.blockchainWallet?.isLinked
                  ? "Wallet Connected"
                  : "No Wallet Linked"}
              </span>
              <span className="wallet-sub">
                {user?.blockchainWallet?.isLinked
                  ? user.blockchainWallet.address?.slice(0, 16) + "..."
                  : "Link a crypto wallet to verify ownership"}
              </span>
            </div>
          </div>
          {user?.blockchainWallet?.isLinked ? (
            <CheckCircle size={20} className="wallet-check" />
          ) : (
            <Link to="/blockchain/verify" className="btn-wallet-link">
              Link Wallet
            </Link>
          )}
        </div>
      </section>

      {/* Collaboration */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <Users size={16} /> Open to Collaboration
        </h3>
        <div className="collab-card">
          <MessageCircle size={20} />
          <span>This author accepts collaboration requests</span>
          <button className="btn-collab">Request Collab</button>
        </div>
      </section>
    </>
  );
};

const PublisherProfileContent = ({ user }) => {
  const mockAuthors = [
    { id: 1, name: "Alex Mercer", books: 3, genre: "Sci-Fi" },
    { id: 2, name: "Sarah Kim", books: 2, genre: "Technology" },
    { id: 3, name: "Emily Chen", books: 4, genre: "Fiction" },
  ];

  const mockProjects = [
    { id: 1, title: "The AI Series", phase: "In Review", authors: 2 },
    {
      id: 2,
      title: "Blockchain for Everyone",
      phase: "Publishing",
      authors: 1,
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="profile-stats-row">
        <StatBubble
          icon={<Users size={20} />}
          value="24"
          label="Authors"
          color="indigo"
        />
        <StatBubble
          icon={<BookOpen size={20} />}
          value="67"
          label="Published"
          color="teal"
        />
        <StatBubble
          icon={<Clock size={20} />}
          value="12"
          label="Active"
          color="pink"
        />
        <StatBubble
          icon={<TrendingUp size={20} />}
          value="$2.4K"
          label="Royalties"
          color="yellow"
        />
      </div>

      {/* Verification badge */}
      <div className="verification-banner">
        <Shield size={20} />
        <div>
          <span className="verification-title">Verified Publisher</span>
          <span className="verification-sub">
            Blockchain-verified identity since Jan 2026
          </span>
        </div>
        <CheckCircle size={20} className="verification-check" />
      </div>

      {/* Active projects */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <TrendingUp size={16} /> Active Projects
        </h3>
        <div className="project-list">
          {mockProjects.map((proj) => (
            <div key={proj.id} className="project-item">
              <div className="project-info">
                <span className="project-title">{proj.title}</span>
                <span className="project-meta">
                  {proj.authors} author{proj.authors > 1 ? "s" : ""}
                </span>
              </div>
              <span
                className={`phase-badge phase--${proj.phase
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {proj.phase}
              </span>
              <ChevronRight size={16} className="project-arrow" />
            </div>
          ))}
        </div>
      </section>

      {/* Authors roster */}
      <section className="profile-section">
        <div className="section-header-row">
          <h3 className="profile-section-title">
            <Users size={16} /> Our Authors
          </h3>
          <Link to="/publisher/discover" className="btn-section-action">
            Discover +
          </Link>
        </div>
        <div className="author-roster">
          {mockAuthors.map((author) => (
            <div key={author.id} className="author-roster-item">
              <div className="author-roster-avatar">
                {author.name.charAt(0)}
              </div>
              <div className="author-roster-info">
                <span className="author-roster-name">{author.name}</span>
                <span className="author-roster-meta">
                  {author.books} books · {author.genre}
                </span>
              </div>
              <ChevronRight size={16} className="project-arrow" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// ── Main ProfilePage ──────────────────────────────────────────────────────────

const ProfilePage = () => {
  const { user, isAuthor, isPublisher, isReader } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

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
