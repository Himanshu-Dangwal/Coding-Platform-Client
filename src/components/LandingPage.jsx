import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Custom CSS for the design

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <header className="landing-header">
                <div className="hero-content">
                    <h1 className="animate-text">Welcome to CodePlatform</h1>
                    <p className="animate-subtext">Your one-stop solution for coding challenges and practice.</p>
                    <Link to="/register" className="btn btn-info btn-animated">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="features">
                <h2>Our Features</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <i className="fas fa-code"></i>
                        <h3>Practice Problems</h3>
                        <p>Access a wide variety of coding problems to improve your skills.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-terminal"></i>
                        <h3>Real-Time Code Execution</h3>
                        <p>Submit your code and see results instantly with our powerful execution engine.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-users"></i>
                        <h3>Learn from Others</h3>
                        <p>Review solutions from other users and enhance your learning with peer-to-peer knowledge sharing.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-comments"></i>
                        <h3>Community Support</h3>
                        <p>Join a community of like-minded coders for help and collaboration on challenging problems.</p>
                    </div>
                </div>
            </section>

            {/* Parallax Scrolling Section */}
            <section className="parallax-section">
                <div className="parallax-content">
                    <h2>Take Your Coding Skills to the Next Level</h2>
                    <p>CodePlatform provides the resources, challenges, and support you need to excel as a coder.</p>
                    <Link to="/contact-me" className="btn btn-primary btn-animated">Contact Us</Link>
                </div>
            </section>


            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-list">
                    <div className="testimonial-item">
                        <p>"This platform has helped me sharpen my coding skills tremendously!"</p>
                        <span>- Alex J.</span>
                    </div>
                    <div className="testimonial-item">
                        <p>"The challenges are engaging and the community is very supportive."</p>
                        <span>- Jamie L.</span>
                    </div>
                    <div className="testimonial-item">
                        <p>"A great place to learn and improve coding skills!"</p>
                        <span>- Sam K.</span>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="landing-footer">
                <p>© 2024 Code Buddy. All Rights Reserved.</p>
                <Link to="/register" className="btn btn-secondary btn-animated">
                    Join Now
                </Link>
            </footer>
        </div>
    );
};

export default LandingPage;
