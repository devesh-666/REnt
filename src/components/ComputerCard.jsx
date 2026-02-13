import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const ComputerCard = ({ computer }) => {
    return (
        <div className="card">
            <div className="image-container">
                <img src={computer.image} alt={computer.name} className="card-img" />
                <span className={`status-badge ${computer.status.toLowerCase()}`}>
                    {computer.status}
                </span>
            </div>
            <div className="card-body">
                <div className="category-tag">{computer.category}</div>
                <h3 className="card-title">{computer.name}</h3>
                <div className="rating">
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <span className="reviews">(12)</span>
                </div>
                <div className="card-specs">
                    <span>{computer.specs.processor}</span> • <span>{computer.specs.ram}</span>
                </div>
                <div className="card-footer">
                    <div className="price">
                        ${computer.price.day} <span className="period">/ day</span>
                    </div>
                    <Link to={`/rentals/${computer.id}`} className="btn-detail">
                        Details <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
            <style jsx>{`
        .image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .card:hover .card-img {
          transform: scale(1.05);
        }
        .status-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .status-badge.available {
          background-color: #10b981;
          color: white;
        }
        .status-badge.rented {
          background-color: #ef4444;
          color: white;
        }
        .category-tag {
          font-size: 0.8rem;
          color: var(--primary-color);
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 0.5rem;
        }
        .reviews {
          color: var(--text-color);
          opacity: 0.6;
          font-size: 0.8rem;
          margin-left: 5px;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--secondary-color);
        }
        .period {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-color);
        }
        .btn-detail {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--primary-color);
          font-weight: 600;
          transition: gap 0.2s;
        }
        .btn-detail:hover {
          gap: 0.5rem;
        }
      `}</style>
        </div>
    );
};

export default ComputerCard;
