import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  PenTool,
  BookMarked,
  Shield,
  ChevronRight,
  Activity,
  Clock,
  FileText,
  Wallet
} from "lucide-react";
import "../styles/Dashboard.css";

// ── Quick action card ─────────────────────────────────────────────────────────
const ActionCard = ({
  icon,
  title,
  subtitle,
  to,
  color = "default",
  onClick,
}) => {
  const Tag = to ? Link : "button";
  return (
    <Tag
      to={to}
      onClick={onClick}
      className={`action-card action-card--${color}`}
    >
      <div className="action-card-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </Tag>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, trend }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      <div className={`stat-icon ${color}`}>{icon}</div>
    </div>
    {trend && (
      <div className="stat-trend positive">
        <TrendingUp size={14} />
        <span>{trend}</span>
      </div>
    )}
  </div>
);

// ── Role dashboards ───────────────────────────────────────────────────────────

const AuthorDashboard = ({ navigate }) => (
  <>
    <div className="stats-grid">
      <StatCard
        label="Total Books"
        value="5"
        icon={<BookOpen size={18} />}
        color="indigo"
        trend="+1 this month"
      />
      <StatCard
        label="Total Reads"
        value="1,243"
        icon={<Users size={18} />}
        color="purple"
        trend="+12% this week"
      />
      <StatCard
        label="Followers"
        value="342"
        icon={<Users size={18} />}
        color="pink"
        trend="+18 new"
      />
      <StatCard
        label="Avg. Rating"
        value="4.5"
        icon={<Star size={18} />}
        color="yellow"
      />
    </div>

    <div className="section-label">Quick Actions</div>
    <div className="actions-grid">
      <ActionCard
        icon={<PenTool size={22} />}
        title="Write New Book"
        subtitle="Start your next story"
        to="/upload-book"
        color="primary"
      />
      <ActionCard
        icon={<Users size={22} />}
        title="Collaborate"
        subtitle="Co-author with others"
        to="/collaborative-writing"
        color="green"
      />
      <ActionCard
        icon={<Shield size={22} />}
        title="Verify Ownership"
        subtitle="Register on blockchain"
        to="/blockchain/verify"
        color="blue"
      />
    </div>
  </>
);

const PublisherDashboard = ({ navigate }) => (
  <>
    <div className="stats-grid">
      <StatCard
        label="Authors"
        value="24"
        icon={<Users size={18} />}
        color="indigo"
      />
      <StatCard
        label="Active Projects"
        value="12"
        icon={<FileText size={18} />}
        color="purple"
      />
      <StatCard
        label="Pending Reviews"
        value="8"
        icon={<Clock size={18} />}
        color="pink"
      />
      <StatCard
        label="Royalties"
        value="$2.4K"
        icon={<TrendingUp size={18} />}
        color="yellow"
      />
    </div>

    <div className="section-label">Quick Actions</div>
    <div className="actions-grid actions-grid--2">
      <ActionCard
        icon={<FileText size={22} />}
        title="Publication Requests"
        subtitle="Review author submissions"
        to="/publisher/requests"
        color="primary"
      />
      <ActionCard
        icon={<Users size={22} />}
        title="Discover Authors"
        subtitle="Find new talent"
        to="/publisher/discover"
        color="green"
      />
    </div>
  </>
);

const ReaderDashboard = ({ navigate }) => (
  <>
    <div className="stats-grid stats-grid--3">
      <StatCard
        label="Books Read"
        value="23"
        icon={<BookOpen size={18} />}
        color="indigo"
      />
      <StatCard
        label="Reviews Written"
        value="15"
        icon={<Star size={18} />}
        color="purple"
      />
      <StatCard
        label="Following"
        value="8"
        icon={<Users size={18} />}
        color="pink"
      />
    </div>

    <div className="section-label">Quick Actions</div>
    <div className="actions-grid actions-grid--2">
      <ActionCard
        icon={<BookMarked size={22} />}
        title="Discover Books"
        subtitle="AI-powered picks for you"
        to="/books"
        color="primary"
      />
      <ActionCard
        icon={<Users size={22} />}
        title="Author Matches"
        subtitle="Find authors you'll love"
        to="/recommendations/matches"
        color="green"
      />
    </div>
  </>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user, isAuthor, isPublisher, isReader, logout } = useAuth();
  const navigate = useNavigate();

  const roleSubtitle = isAuthor
    ? "Your literary journey continues..."
    : isPublisher
    ? "Manage your publishing network"
    : "Discover your next favourite book";

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="header-title">
            <h1>Welcome back, {user?.name?.split(" ")[0]}!</h1>
            <p>{roleSubtitle}</p>
          </div>
          <SearchBar />
          <Link to="/profile" className="profile-pill">
          <div className="profile-pill-avatar">
            {user?.name?.split(" ").map(n=>n[0]).join("").toUpperCase()}
          </div>
          <div className="profile-pill-info">
            <span className="profile-pill-name">{user?.name?.split(" ")[0]}</span>
            <span className="profile-pill-role">{user?.role}</span>
          </div>
          </Link>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Role-specific content */}
        {isAuthor && <AuthorDashboard navigate={navigate} />}
        {isPublisher && <PublisherDashboard navigate={navigate} />}
        {isReader && <ReaderDashboard navigate={navigate} />}

        {/* Activity + Recommendations */}
        <div className="dashboard-grid">
          <div className="recent-activity">
            <div className="section-header">
              <Activity size={18} />
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              {[
                {
                  action: "Published new book",
                  detail: "The Digital Age",
                  time: "2 hours ago",
                },
                {
                  action: "Received review",
                  detail: '5 stars on "Blockchain Basics"',
                  time: "5 hours ago",
                },
                {
                  action: "Started collaboration",
                  detail: "with Sarah Johnson",
                  time: "1 day ago",
                },
                {
                  action: "Ownership verified",
                  detail: "Recorded on blockchain",
                  time: "2 days ago",
                },
              ].map((item, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">
                    <Clock size={14} />
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{item.action}</p>
                    <p className="activity-title">{item.detail}</p>
                    <p className="activity-time">{item.time}</p>
                  </div>
                  <ChevronRight size={16} className="activity-arrow" />
                </div>
              ))}
            </div>
          </div>

          <div className="recommendations">
            <div className="section-header">
              <TrendingUp size={18} />
              <h2>AI Recommendations</h2>
            </div>
            <div className="recommendations-list">
              {[
                { title: "AI Revolution", author: "John Smith", match: "95%" },
                {
                  title: "Blockchain for Authors",
                  author: "Emily Chen",
                  match: "92%",
                },
                {
                  title: "Digital Publishing Guide",
                  author: "Michael Brown",
                  match: "88%",
                },
              ].map((book, i) => (
                <div key={i} className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="recommendation-title">{book.title}</span>
                    <span className="match-badge">{book.match}</span>
                  </div>
                  <p className="recommendation-author">by {book.author}</p>
                  <button className="btn-view">View Details →</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain status */}
        <div className="blockchain-status">
          <div className="status-content">
            <div className="status-icon">
              <Shield size={28} />
            </div>
            <div className="status-text">
              <h3>Blockchain Verification Status</h3>
              <p>
                {user?.blockchainWallet?.isLinked
                  ? `Wallet linked: ${user.blockchainWallet.address?.slice(
                      0,
                      20,
                    )}...`
                  : "Link your wallet to verify content ownership"}
              </p>
            </div>
          </div>
          {!user?.blockchainWallet?.isLinked && (
            <button className="btn-link-wallet">
              <Wallet size={15} /> Link Wallet
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
