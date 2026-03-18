import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Star,
  TrendingUp,
  PenTool,
  Shield,
} from "lucide-react";
import StatBubble from "./StatBubble";
import InterestTag from "./InterestTag";
import BookListItem from "./BookListItem";
import WalletCard from "./WalletCard";
import CollaborationCard from "./CollaborationCard";
import "../../styles/ProfilePage.css";

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
            <BookListItem
              key={book.id}
              book={book}
              showStatus={true}
              showRating={true}
            />
          ))}
        </div>
      </section>

      {/* Blockchain wallet status */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <Shield size={16} /> Blockchain Ownership
        </h3>
        <WalletCard user={user} />
      </section>

      {/* Collaboration */}
      <section className="profile-section">
        <h3 className="profile-section-title">
          <Users size={16} /> Open to Collaboration
        </h3>
        <CollaborationCard />
      </section>
    </>
  );
};

export default AuthorProfileContent;
