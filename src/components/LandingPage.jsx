import React from 'react';
import { Link } from 'react-router-dom';
import codingIllustration from '../images/coding-illustration.jpeg';
import cp from '../images/CP.png'
import dsa from '../images/DSA.png'
import interview from '../images/Interview.png'



const LandingPage = ({ darkMode }) => {
    return (
        <div className="landing-container">

            <section
                className="hero-section text-center d-flex align-items-center justify-content-center py-5 position-relative"
                style={{
                    backgroundImage: `url(${codingIllustration})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "#fff", // Ensure text remains readable
                    height: "90vh", // Ensures it covers the first screen only
                }}
            >
                <div
                    className="container d-flex flex-column align-items-center justify-content-between position-relative"
                    style={{ zIndex: 2, height: "100%" }}
                >
                    <h1 className="display-4 mb-4" style={{ marginBottom: "20px" }}>
                        Master Coding with Structured Tracks
                    </h1>
                    <p className="lead mb-4" style={{ marginBottom: "40px" }}>
                        Learn, practice, and excel in coding interviews through our curated learning paths
                    </p>
                    <div className="cta-buttons d-flex justify-content-center" style={{ marginTop: "auto" }}>
                        <Link to="/register" className="btn btn-primary btn-lg me-3">
                            Start Learning
                        </Link>
                        <Link to="/tracks" className="btn btn-outline-light btn-lg">
                            Explore Tracks
                        </Link>
                    </div>
                </div>
                <div
                    className="overlay position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
                ></div>
            </section>




            {/* Tracks Section */}
            <section className={`tracks-section py-5 bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"}`}>
                <div className="container">
                    <h2 className="text-center mb-5">Featured Learning Tracks</h2>
                    <div className="row g-4">
                        {[
                            { img: dsa, title: "DSA for Beginners", text: "Master Data Structures & Algorithms from scratch with 99 carefully curated problems", link: "/tracks/dsa" },
                            { img: cp, title: "Competitive Programming", text: "Advanced problem-solving techniques for programming contests and competitions", link: "/tracks/cp" },
                            { img: interview, title: "Interview Preparation", text: "Crack coding interviews at FAANG companies with our targeted problem sets", link: "/tracks/interviews" },
                        ].map((track, index) => (
                            <div key={index} className="col-md-4">
                                <div className="card h-100 shadow">
                                    <img
                                        src={track.img}
                                        className="card-img-top img-fluid rounded-top"
                                        alt={track.title}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h3 className={`card-title text-${darkMode ? "light" : "dark"}`}>{track.title}</h3>
                                        <p className={`card-text text-${darkMode ? "light" : "dark"}`}>{track.text}</p>
                                        <div className="progress mb-3">
                                            <div className="progress-bar" style={{ width: '33%' }}>99 Problems</div>
                                        </div>
                                        <Link to={track.link} className="btn btn-outline-primary">
                                            Start Track
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Features Section */}
            <section className="features-section py-5">
                <div className="container">
                    <div className="row g-4 text-center">
                        <div className="col-md-3">
                            <div className="feature-card p-4">
                                <i className="bi bi-code-square fs-1 text-primary"></i>
                                <h4>Integrated IDE</h4>
                                <p>Practice directly in our browser-based coding environment</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="feature-card p-4">
                                <i className="bi bi-graph-up fs-1 text-primary"></i>
                                <h4>Progress Tracking</h4>
                                <p>Visualize your learning journey with detailed analytics</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="feature-card p-4">
                                <i className="bi bi-trophy fs-1 text-primary"></i>
                                <h4>Daily Challenges</h4>
                                <p>Compete in daily contests and climb the leaderboard</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="feature-card p-4">
                                <i className="bi bi-patch-check fs-1 text-primary"></i>
                                <h4>Expert Solutions</h4>
                                <p>Learn optimal approaches with detailed editorials</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}

        </div>
    );
};

export default LandingPage;


