import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <section style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', color: 'white', padding: '4rem 1rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Contact Us</h1>
                <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>We'd love to hear from you. Get in touch with our team.</p>
            </section>

            <section style={{ padding: '4rem 1rem', flex: 1 }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Contact Info */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Get in Touch</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <MapPin size={24} style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Address</h4>
                                    <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>123 Tech Street, Silicon Valley, CA 94025</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <Phone size={24} style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Phone</h4>
                                    <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <Mail size={24} style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>Email</h4>
                                    <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>support@techrent.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Send a Message</h2>
                        {submitted ? (
                            <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 'var(--radius)', padding: '2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#10003;</div>
                                <h3 style={{ color: '#065f46', marginBottom: '0.5rem' }}>Message Sent!</h3>
                                <p style={{ color: '#047857' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <button
                                    className="btn btn-primary"
                                    style={{ marginTop: '1rem' }}
                                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Your message..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
