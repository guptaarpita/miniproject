import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  TrendingUp,
  Award,
  PenTool,
  BookMarked,
  MessageCircle,
  Shield,
  ChevronRight,
  Activity,
  Clock,
  Star,
  FileText,
} from "lucide-react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, isAuthor, isPublisher, isReader, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalReads: 1243,
    totalBooks: 5,
    followers: 342,
    rating: 4.5,
  });

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Published new book",
      title: "The Digital Age",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Received review",
      title: '5 stars on "Blockchain Basics"',
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Started collaboration",
      title: "with Sarah Johnson",
      time: "1 day ago",
    },
    {
      id: 4,
      action: "Book verified",
      title: "Ownership recorded on blockchain",
      time: "2 days ago",
    },
  ];

  // Mock data for recommendations
  const recommendations = [
    { id: 1, title: "AI Revolution", author: "John Smith", match: "95%" },
    {
      id: 2,
      title: "Blockchain for Authors",
      author: "Emily Chen",
      match: "92%",
    },
    {
      id: 3,
      title: "Digital Publishing Guide",
      author: "Michael Brown",
      match: "88%",
    },
  ];

  const getDashboardContent = () => {
    if (isAuthor) {
      return (
        <>
          {/* Author Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Total Books</p>
                  <p className="stat-value">{stats.totalBooks}</p>
                </div>
                <div className="stat-icon indigo">
                  <BookOpen />
                </div>
              </div>
              <div className="stat-trend positive">
                <TrendingUp />
                <span>+2 this month</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Total Reads</p>
                  <p className="stat-value">{stats.totalReads}</p>
                </div>
                <div className="stat-icon purple">
                  <Users />
                </div>
              </div>
              <div className="stat-trend positive">
                <TrendingUp />
                <span>+12% this week</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Followers</p>
                  <p className="stat-value">{stats.followers}</p>
                </div>
                <div className="stat-icon pink">
                  <Users />
                </div>
              </div>
              <div className="stat-trend positive">
                <TrendingUp />
                <span>+18 new</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Avg. Rating</p>
                  <p className="stat-value">{stats.rating}</p>
                </div>
                <div className="stat-icon yellow">
                  <Star />
                </div>
              </div>
              <div className="stat-trend">
                <span>Based on 89 reviews</span>
              </div>
            </div>
          </div>

          {/* Author Actions */}
          <div className="actions-grid">
            <button
              onClick={() => navigate("/upload-book")}
              className="action-card"
            >
              <PenTool />
              <h3>Write New Book</h3>
              <p>Start your next masterpiece</p>
            </button>

            <button
              onClick={() => navigate("/collaborative-writing")}
              className="action-card green"
            >
              <Users />
              <h3>Collaborate</h3>
              <p>Write with other authors</p>
            </button>

            <button
              onClick={() => navigate("/blockchain/verify")}
              className="action-card blue"
            >
              <Shield />
              <h3>Verify Ownership</h3>
              <p>Secure your work on blockchain</p>
            </button>
          </div>
        </>
      );
    } else if (isPublisher) {
      return (
        <>
          {/* Publisher Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Published Authors</p>
                  <p className="stat-value">24</p>
                </div>
                <div className="stat-icon indigo">
                  <Users />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Active Projects</p>
                  <p className="stat-value">12</p>
                </div>
                <div className="stat-icon purple">
                  <FileText />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Pending Reviews</p>
                  <p className="stat-value">8</p>
                </div>
                <div className="stat-icon pink">
                  <Clock />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Royalties</p>
                  <p className="stat-value">$2.4K</p>
                </div>
                <div className="stat-icon yellow">
                  <TrendingUp />
                </div>
              </div>
            </div>
          </div>

          {/* Publisher Actions */}
          <div
            className="actions-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <button
              onClick={() => navigate("/publisher/requests")}
              className="action-card"
            >
              <FileText />
              <h3>Publication Requests</h3>
              <p>Review author submissions</p>
            </button>

            <button
              onClick={() => navigate("/publisher/discover")}
              className="action-card green"
            >
              <Users />
              <h3>Discover Authors</h3>
              <p>Find new talents</p>
            </button>
          </div>
        </>
      );
    } else {
      // Reader Dashboard
      return (
        <>
          {/* Reader Stats */}
          <div
            className="stats-grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Books Read</p>
                  <p className="stat-value">23</p>
                </div>
                <div className="stat-icon indigo">
                  <BookOpen />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Reviews Written</p>
                  <p className="stat-value">15</p>
                </div>
                <div className="stat-icon purple">
                  <Star />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div>
                  <p className="stat-label">Following</p>
                  <p className="stat-value">8</p>
                </div>
                <div className="stat-icon pink">
                  <Users />
                </div>
              </div>
            </div>
          </div>

          {/* Reader Actions */}
          <div
            className="actions-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <button onClick={() => navigate("/books")} className="action-card">
              <BookMarked />
              <h3>Discover Books</h3>
              <p>AI-powered recommendations</p>
            </button>

            <button
              onClick={() => navigate("/recommendations/matches")}
              className="action-card green"
            >
              <Users />
              <h3>Author Matches</h3>
              <p>Find authors you'll love</p>
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="header-title">
            <h1>Welcome back, {user?.name}!</h1>
            <p>
              {isAuthor && "Your literary journey continues..."}
              {isPublisher && "Manage your publishing network"}
              {isReader && "Discover your next favorite book"}
            </p>
          </div>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {getDashboardContent()}

        {/* Recent Activity and Recommendations */}
        <div className="dashboard-grid">
          {/* Recent Activity */}
          <div className="recent-activity">
            <div className="section-header">
              <Activity />
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <Clock />
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-title">{activity.title}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                  <ChevronRight className="activity-arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="recommendations">
            <div className="section-header">
              <TrendingUp />
              <h2>AI Recommendations</h2>
            </div>
            <div className="recommendations-list">
              {recommendations.map((book) => (
                <div key={book.id} className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="recommendation-title">{book.title}</span>
                    <span className="match-badge">{book.match} match</span>
                  </div>
                  <p className="recommendation-author">by {book.author}</p>
                  <button className="btn-view">View Details →</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain Status */}
        <div className="blockchain-status">
          <div className="status-content">
            <div className="status-icon">
              <Shield />
            </div>
            <div className="status-text">
              <h3>Blockchain Verification Status</h3>
              <p>
                {user?.blockchainWallet?.isLinked
                  ? "Your wallet is linked and verified"
                  : "Link your wallet to verify ownership"}
              </p>
            </div>
          </div>
          {!user?.blockchainWallet?.isLinked && (
            <button className="btn-link-wallet">Link Wallet</button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
