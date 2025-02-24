// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ isLoggedIn, handleLogout }) => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//             <div className="container">
//                 <Link className="navbar-brand" to="/">Code Buddy</Link>
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
//                     <ul className="navbar-nav mx-auto w-100 justify-content-evenly">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/problems">Problems</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/contests">Contests</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/profile">My Profile</Link>
//                         </li>
//                         {isLoggedIn ? (
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
//                             </li>
//                         ) : (
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/login">Login</Link>
//                             </li>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout, darkMode, toggleDarkMode }) => {
    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">CodeBuddy</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/problems">Problems</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tracks">Tracks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contests">Contests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-secondary me-2"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? '🌞' : '🌙'}
                        </button>
                        {isLoggedIn ? (
                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="btn btn-primary">
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