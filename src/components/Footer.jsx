import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <h3>TechRent</h3>
                        <p>
                            Premium computer rentals for professionals, students, and events.
                            Quality equipment, flexible terms.
                        </p>
                        <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={20} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter size={20} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/rentals">Rentals</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact Info</h4>
                        <ul>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <MapPin size={18} /> 123 Tech Street, Silicon Valley, CA
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Phone size={18} /> +1 (555) 123-4567
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <Mail size={18} /> support@techrent.com
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TechRent. All rights reserved.</p>
                </div>
            </div>
            <style jsx>{`
        .footer-section {
          background-color: var(--secondary-color);
          color: white;
          padding: 4rem 0 2rem;
          margin-top: auto;
        }
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .footer-col h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
          /* If primary color doesn't contrast well on secondary, use white or accent */
          color: white;
        }
        .footer-col h4 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--gray-300);
        }
        .footer-col p {
          color: var(--gray-300);
          line-height: 1.6;
        }
        .footer-col ul li {
          margin-bottom: 0.5rem;
        }
        .footer-col ul li a {
          color: var(--gray-300);
          transition: color 0.3s;
        }
        .footer-col ul li a:hover {
          color: white;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1.5rem;
          text-align: center;
          color: var(--gray-300);
          font-size: 0.9rem;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
