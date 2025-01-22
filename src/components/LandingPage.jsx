import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Custom CSS for the design

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <header className="landing-header">
                <div className="hero-content">
                    <h1 className="animate-text">Welcome to CodeBuddy</h1>
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
                        <h3>Learn Algorithms</h3>
                        <p>Your one-stop platform to master algorithms and compete effectively.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-terminal"></i>
                        <h3>Interview Ready</h3>
                        <p>Perfect platform to prepare for interviews at top companies.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-users"></i>
                        <h3>Crack Online Assessments</h3>
                        <p>Solve questions step-by-step and ace online assessments.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-comments"></i>
                        <h3>Incremental Learning</h3>
                        <p>Follow a well-designed learning plan for continuous growth.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-comments"></i>
                        <h3>Topic-wise Practice</h3>
                        <p>Practice topic-wise questions with a structured learning curve.</p>
                    </div>
                </div>
            </section>

            {/* Parallax Scrolling Section
            <section className="parallax-section">
                <div className="parallax-content">
                    <h2>Take Your Coding Skills to the Next Level</h2>
                    <p>CodePlatform provides the resources, challenges, and support you need to excel as a coder.</p>
                    <Link to="/contact-me" className="btn btn-primary btn-animated">Contact Us</Link>
                </div>
            </section> */}


            {/* Testimonials Section */}
            {/* <section className="testimonials">
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
            </section> */}

            <section className='myProfile'>
                <p>I have been solving problems from 2019, and love to design new and effective algortihms. In my journey of problem solving I have always find out that there is no alternative to hard work and being consistent. But equally important is to have a dedicated guided path to work upon and grow exponentially.</p>
                <a href='https://portfolio.dangwalhimanshu.com' target='_blank'><button className='btn btn-info btn-animated'>My Profile</button></a>
            </section>

            {/* Footer Section */}
            <footer className="landing-footer">
                <p>© 2024 Code Buddy. All Rights Reserved.</p>
                <Link to="/register" className="btn btn-primary btn-animated">
                    Join Now
                </Link>
            </footer>
        </div>
    );
};

export default LandingPage;
