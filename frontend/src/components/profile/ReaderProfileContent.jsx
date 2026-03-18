import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Star, Award, Clock, BookMarked } from "lucide-react";
import StatBubble from "./StatBubble";
import InterestTag from "./InterestTag";
import BookListItem from "./BookListItem";
import { WishlistCard, AddWishlistCard } from "./WishlistCard";
import "../../styles/ProfilePage.css";

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
            <BookListItem key={book.id} book={book} showRating={true} />
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
            <WishlistCard key={book.id} book={book} />
          ))}
          <AddWishlistCard />
        </div>
      </section>
    </>
  );
};

export default ReaderProfileContent;
