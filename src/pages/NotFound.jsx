import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const NotFound = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>Page Not Found</h2>
            <p style={{ color: 'var(--text-color)', opacity: 0.7, marginBottom: '2rem', maxWidth: '400px' }}>
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">Return Home</Link>
        </div>
        <Footer />
    </div>
);

export default NotFound;
