// Navbar Component
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoAdd, IoLogIn, IoLogOut, IoMenu, IoClose, IoHome, IoDocumentText, IoGrid, IoPersonCircle } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar glass">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🧠</span>
                    <span className="brand-text">KnowledgeMind</span>
                </Link>

                <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <IoClose /> : <IoMenu />}
                </button>

                <div className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        <IoHome /> Home
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/create"
                                className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <IoAdd /> New Article
                            </Link>

                            <Link
                                to="/dashboard"
                                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <IoGrid /> My Articles
                            </Link>
                        </>
                    )}

                    <div className="nav-divider"></div>

                    {isAuthenticated ? (
                        <div className="nav-user">
                            <span className="nav-username">👋 {user?.username}</span>
                            <Link
                                to="/profile"
                                className="btn btn-ghost btn-sm"
                                onClick={() => setMobileOpen(false)}
                            >
                                <IoPersonCircle /> Profile
                            </Link>
                            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                                <IoLogOut /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="nav-auth">
                            <Link
                                to="/login"
                                className="btn btn-ghost btn-sm"
                                onClick={() => setMobileOpen(false)}
                            >
                                <IoLogIn /> Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn btn-primary btn-sm"
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
