import React from 'react'
import { Link } from 'react-router-dom';
import cp from '../images/CP.png'
import dsa from '../images/DSA.png'
import interview from '../images/Interview.png'

function Tracks({ darkMode }) {
    return (
        <>
            <section className={`tracks-section py-5 bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"}`}>
                <div className="container">
                    <h2 className="text-center mb-5">Featured Learning Tracks</h2>
                    <div className="row g-4">
                        {[
                            { img: dsa, title: "DSA for Beginners", text: "Master Data Structures & Algorithms from scratch with 99 carefully curated problems", link: "/tracks/dsa" },
                            { img: cp, title: "Competitive Programming", text: "Advanced problem-solving techniques for programming contests and competitions", link: "/tracks/cp" },
                            { img: interview, title: "Interview Preparation", text: "Crack coding interviews at FAANG companies with our targeted problem sets", link: "/tracks/interview" },
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
        </>
    )
}

export default Tracks