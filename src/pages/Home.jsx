import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { computers } from '../utils/dummyData';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const [featuredComputers, setFeaturedComputers] = useState([]);

    useEffect(() => {
        setFeaturedComputers(computers.slice(0, 3));
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Power Your Potential with Premium Tech Rentals</h1>
                    <p>
                        Access the latest laptops, workstations, and gaming PCs without the heavy upfront cost.
                        Perfect for freelancers, students, and businesses.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/rentals" className="btn btn-primary">Browse Computers</Link>
                        <Link to="/contact" className="btn btn-outline-white">Get a Quote</Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="featured section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Rentals</h2>
                        <p className="section-subtitle">Top-rated equipment chosen by our customers</p>
                    </div>
                    <div className="grid">
                        {featuredComputers.map(computer => (
                            <div key={computer.id} className="card">
                                <div className="card-img-container">
                                    <img src={computer.image} alt={computer.name} className="card-img" />
                                    <span className={`status-badge ${computer.status.toLowerCase()}`}>
                                        {computer.status}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <span className="card-category">{computer.category}</span>
                                    <h3 className="card-title">{computer.name}</h3>
                                    <div className="card-specs">
                                        <span>{computer.specs.processor}</span> • <span>{computer.specs.ram}</span>
                                    </div>
                                    <div className="card-bottom">
                                        <div className="card-price">
                                            ${computer.price.day} <span className="period">/ day</span>
                                        </div>
                                        <Link to={`/rentals/${computer.id}`} className="btn-link">View Details &rarr;</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="center-btn">
                        <Link to="/rentals" className="btn btn-secondary">View All Rentals</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials section-padding bg-gray">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">What Our Customers Say</h2>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="quote">"The MacBook Pro I rented for my design project was in perfect condition. Fast delivery and great support!"</p>
                            <div className="author">
                                <div className="avatar">JD</div>
                                <div className="author-info">
                                    <h4>Jane Doe</h4>
                                    <span>Graphic Designer</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p className="quote">"Needed a gaming PC for a weekend tournament. The Alienware rig was a beast! Will definitely rent again."</p>
                            <div className="author">
                                <div className="avatar secondary">MS</div>
                                <div className="author-info">
                                    <h4>Mark Smith</h4>
                                    <span>Gamer</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p className="quote">"Saved our startup thousands in upfront costs. The workstation rental plans are flexible and affordable."</p>
                            <div className="author">
                                <div className="avatar accent">AL</div>
                                <div className="author-info">
                                    <h4>Alex Lee</h4>
                                    <span>Startup Founder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2>Ready to Upgrade Your Workflow?</h2>
                    <p>Get the best technology delivered to your door today.</p>
                    <Link to="/rentals" className="large">Start Renting Now</Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
