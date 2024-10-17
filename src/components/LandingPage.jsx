import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Optional CSS file for styling

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to CodePlatform</h1>
                <p>Your one-stop solution for coding challenges and practice.</p>
                <Link to="/register" className="btn btn-info">
                    Get Started
                </Link>
            </header>

            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <h3>Practice Problems</h3>
                        <p>Access a wide variety of coding problems to improve your skills.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Real-Time Code Execution</h3>
                        <p>Submit your code and see results instantly.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Learn from Others</h3>
                        <p>Review solutions from other users and enhance your learning.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Community Support</h3>
                        <p>Join a community of like-minded coders for help and collaboration.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>User Testimonials</h2>
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

            <footer className="landing-footer">
                <p>© 2024 CodePlatform. All Rights Reserved.</p>
                <Link to="/register" className="btn btn-secondary">
                    Join Now
                </Link>
            </footer>
        </div>
    );
};

export default LandingPage;
