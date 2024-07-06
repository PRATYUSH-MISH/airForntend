import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from "../img/icon.png";

const Nav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);
    const [hidden, setHidden] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken")); // Check if authToken exists

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("authToken")); // Update isLoggedIn state
    }, []);

    return (
        <header className={`header ${hidden ? 'hidden' : ''}`}>
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">
                    <img className="nav__logo" src={Logo} alt="Logo" />
                    Airline Booking
                </NavLink>

                <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink to="/aboutus" className="nav__link" onClick={closeMenuOnMobile}>
                                About Us
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <li className="nav__item">
                                <NavLink to="/profile" className="nav__link" onClick={closeMenuOnMobile}>
                                    Profile
                                </NavLink>
                            </li>
                        ) : null}

                        {!isLoggedIn ? (
                            <div className='nav__auth-container'>
                                <li className="nav__item">
                                    <NavLink to="/login" className="nav__link nav__cta nav__login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/signup" className="nav__link nav__cta nav__signup">
                                        Sign Up
                                    </NavLink>
                                </li>
                            </div>
                        ) : (
                            <div className='nav__auth-container'>
                                <li className="nav__item">
                                    <NavLink to='/login' className="nav__link nav__cta" onClick={handleLogout}>
                                        Logout
                                    </NavLink>
                                </li>
                            </div>
                        )}
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <IoClose />
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <IoMenu />
                </div>
            </nav>
        </header>
    );
};

export default Nav;
