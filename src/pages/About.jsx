import React from 'react';
import { Shield, Zap, Heart, Globe } from 'lucide-react';
import Footer from '../components/Footer';

const values = [
    { icon: Shield, title: 'Reliability', description: 'Every device is tested and maintained to ensure peak performance for your projects.' },
    { icon: Zap, title: 'Speed', description: 'Quick delivery and setup so you can start working without delays.' },
    { icon: Heart, title: 'Customer First', description: 'Dedicated support team available to help you find the perfect rental solution.' },
    { icon: Globe, title: 'Accessibility', description: 'Flexible rental plans that make premium technology accessible to everyone.' },
];

const team = [
    { name: 'Alex Johnson', role: 'CEO & Founder', initial: 'AJ' },
    { name: 'Sarah Chen', role: 'CTO', initial: 'SC' },
    { name: 'Marcus Williams', role: 'Head of Operations', initial: 'MW' },
];

const About = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Hero Banner */}
        <section style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', color: 'white', padding: '5rem 1rem', textAlign: 'center' }}>
            <div className="container">
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About TechRent</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                    Making premium technology accessible through flexible, affordable rentals.
                </p>
            </div>
        </section>

        {/* Mission */}
        <section style={{ padding: '4rem 1rem' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>Our Mission</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-color)', opacity: 0.8 }}>
                    At TechRent, we believe everyone deserves access to the best technology without the burden of ownership.
                    Whether you're a freelancer needing a powerful workstation for a project, a student preparing for exams,
                    or a business setting up a temporary office, we provide top-tier equipment on your terms.
                </p>
            </div>
        </section>

        {/* Values Grid */}
        <section style={{ padding: '4rem 1rem', backgroundColor: 'var(--gray-100)' }}>
            <div className="container">
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--secondary-color)' }}>Our Values</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {values.map((v) => (
                        <div key={v.title} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                            <v.icon size={40} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem', color: 'var(--secondary-color)' }}>{v.title}</h3>
                            <p style={{ color: 'var(--text-color)', opacity: 0.7, lineHeight: 1.6 }}>{v.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Story */}
        <section style={{ padding: '4rem 1rem' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', color: 'var(--secondary-color)' }}>Our Story</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-color)', opacity: 0.8, marginBottom: '1rem' }}>
                    Founded in 2020, TechRent started with a simple idea: not everyone needs to own a high-end computer
                    to benefit from one. What began as a small operation with a handful of laptops has grown into a trusted
                    platform offering a wide range of computers, workstations, and gaming PCs.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-color)', opacity: 0.8 }}>
                    Today, we serve thousands of customers across the country, from individual creators to Fortune 500
                    companies, all united by the belief that flexibility and access matter more than ownership.
                </p>
            </div>
        </section>

        {/* Team */}
        <section style={{ padding: '4rem 1rem', backgroundColor: 'var(--gray-100)' }}>
            <div className="container">
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--secondary-color)' }}>Our Team</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {team.map((member) => (
                        <div key={member.name} style={{ textAlign: 'center', width: '200px' }}>
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 1rem', color: 'white', fontSize: '1.5rem', fontWeight: 'bold'
                            }}>
                                {member.initial}
                            </div>
                            <h3 style={{ marginBottom: '0.25rem', color: 'var(--secondary-color)' }}>{member.name}</h3>
                            <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Footer />
    </div>
);

export default About;
