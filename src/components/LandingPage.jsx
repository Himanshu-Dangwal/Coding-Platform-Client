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
                    height: "100vh", // Ensures it covers the first screen only
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
            <footer className={`footer bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"} py-4`}>
                <div className="container text-center">
                    <p>© 2024 CodeBuddy. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#" className="text-light mx-2"><i className="bi bi-github"></i></a>
                        <a href="#" className="text-light mx-2"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="text-light mx-2"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;


// import '../styles/LandingPage.css'; // Custom CSS for the design

// const LandingPage = () => {
//     return (
//         <div className="landing-page">
//             {/* Hero Section */}
//             <header className="landing-header">
//                 <div className="hero-content">
//                     <h1 className="animate-text">Welcome to CodeBuddy</h1>
//                     <p className="animate-subtext">Your one-stop solution for coding challenges and practice.</p>
//                     <Link to="/register" className="btn btn-info btn-animated">
//                         Get Started
//                     </Link>
//                 </div>
//             </header>

//             {/* Features Section */}
//             <section className="features">
//                 <h2>Our Features</h2>
//                 <div className="feature-list">
//                     <div className="feature-item">
//                         <i className="fas fa-code"></i>
//                         <h3>Learn Algorithms</h3>
//                         <p>Your one-stop platform to master algorithms and compete effectively.</p>
//                     </div>
//                     <div className="feature-item">
//                         <i className="fas fa-terminal"></i>
//                         <h3>Interview Ready</h3>
//                         <p>Perfect platform to prepare for interviews at top companies.</p>
//                     </div>
//                     <div className="feature-item">
//                         <i className="fas fa-users"></i>
//                         <h3>Crack Online Assessments</h3>
//                         <p>Solve questions step-by-step and ace online assessments.</p>
//                     </div>
//                     <div className="feature-item">
//                         <i className="fas fa-comments"></i>
//                         <h3>Incremental Learning</h3>
//                         <p>Follow a well-designed learning plan for continuous growth.</p>
//                     </div>
//                     <div className="feature-item">
//                         <i className="fas fa-comments"></i>
//                         <h3>Topic-wise Practice</h3>
//                         <p>Practice topic-wise questions with a structured learning curve.</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Parallax Scrolling Section
//             <section className="parallax-section">
//                 <div className="parallax-content">
//                     <h2>Take Your Coding Skills to the Next Level</h2>
//                     <p>CodePlatform provides the resources, challenges, and support you need to excel as a coder.</p>
//                     <Link to="/contact-me" className="btn btn-primary btn-animated">Contact Us</Link>
//                 </div>
//             </section> */}


//             {/* Testimonials Section */}
//             {/* <section className="testimonials">
//                 <h2>What Our Users Say</h2>
//                 <div className="testimonial-list">
//                     <div className="testimonial-item">
//                         <p>"This platform has helped me sharpen my coding skills tremendously!"</p>
//                         <span>- Alex J.</span>
//                     </div>
//                     <div className="testimonial-item">
//                         <p>"The challenges are engaging and the community is very supportive."</p>
//                         <span>- Jamie L.</span>
//                     </div>
//                     <div className="testimonial-item">
//                         <p>"A great place to learn and improve coding skills!"</p>
//                         <span>- Sam K.</span>
//                     </div>
//                 </div>
//             </section> */}

//             <section className='myProfile'>
//                 <p>I have been solving problems from 2019, and love to design new and effective algortihms. In my journey of problem solving I have always find out that there is no alternative to hard work and being consistent. But equally important is to have a dedicated guided path to work upon and grow exponentially.</p>
//                 <a href='https://portfolio.dangwalhimanshu.com' target='_blank'><button className='btn btn-info btn-animated'>My Profile</button></a>
//             </section>

//             {/* Footer Section */}
//             <footer className="landing-footer">
//                 <p>© 2024 Code Buddy. All Rights Reserved.</p>
//                 <Link to="/register" className="btn btn-primary btn-animated">
//                     Join Now
//                 </Link>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;

