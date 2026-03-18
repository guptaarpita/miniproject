import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, TrendingUp, Shield } from "lucide-react";
import StatBubble from "./StatBubble";
import ProjectItem from "./ProjectItem";
import AuthorRosterItem from "./AuthorRosterItem";
import VerificationBanner from "./VerificationBanner";
import "../../styles/ProfilePage.css";

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
      <VerificationBanner />

      {/* Active projects */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <TrendingUp size={16} /> Active Projects
        </h3>
        <div className="project-list">
          {mockProjects.map((proj) => (
            <ProjectItem key={proj.id} project={proj} />
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
            <AuthorRosterItem key={author.id} author={author} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PublisherProfileContent;
