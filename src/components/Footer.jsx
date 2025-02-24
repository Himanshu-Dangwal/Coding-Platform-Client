import React from 'react';

function Footer({ darkMode }) {
    return (
        <footer className={`footer justify-content-center align-items-center bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"} py-4`}>
            <div className="container text-center">
                <p>© 2024 CodeBuddy. All rights reserved.</p>
                <div className="social-links">
                    <a
                        className="instagram mx-2"
                        aria-label="Instagram"
                        href="https://www.instagram.com/_himanshu_dangwal_"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-instagram" style={{ fontSize: "1.8rem", cursor: "pointer", display: "inline-block" }}></i>
                    </a>
                    <a
                        className="github mx-2"
                        aria-label="GitHub"
                        href="https://github.com/Himanshu-Dangwal/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-github" style={{ fontSize: "1.8rem", cursor: "pointer", display: "inline-block" }}></i>
                    </a>
                    <a
                        className="youtube mx-2"
                        aria-label="YouTube"
                        href="https://www.youtube.com/@HimanshuDangwal99"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-youtube" style={{ fontSize: "1.8rem", cursor: "pointer", display: "inline-block" }}></i>
                    </a>
                    <a
                        className="linkedin mx-2"
                        aria-label="LinkedIn"
                        href="https://www.linkedin.com/in/himanshu-dangwal-682330197/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedin" style={{ fontSize: "1.8rem", cursor: "pointer", display: "inline-block" }}></i>
                    </a>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
