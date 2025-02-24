import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout, darkMode, toggleDarkMode }) => {
    const navbarToggle = useRef(null);
    const navbarCollapse = useRef(null);

    const handleToggleDarkModeButtonClick = () => {
        if (navbarCollapse.current.classList.contains('show')) {
            navbarToggle.current.click();
        }
        toggleDarkMode();
    }

    const logoutButtonClick = () => {
        if (navbarCollapse.current.classList.contains('show')) {
            navbarToggle.current.click();
        }
        handleLogout();
    }

    const handleLinkClick = () => {
        if (navbarCollapse.current.classList.contains('show')) {
            navbarToggle.current.click();
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">CodeBuddy</Link>
                <button
                    ref={navbarToggle}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapse}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/problems" onClick={handleLinkClick}>Problems</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tracks" onClick={handleLinkClick}>Tracks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contests" onClick={handleLinkClick}>Contests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile" onClick={handleLinkClick}>Profile</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-secondary me-2"
                            onClick={handleToggleDarkModeButtonClick}
                        >
                            {darkMode ? '🌞' : '🌙'}
                        </button>
                        {isLoggedIn ? (
                            <button
                                className="btn btn-danger"
                                onClick={logoutButtonClick}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="btn btn-primary" onClick={handleLinkClick}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
