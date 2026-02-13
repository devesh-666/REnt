import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// import './Navbar.css'; // Removed as styles are in index.css

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    const { user, logout } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    TechRent
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <X /> : <Menu />}
                </div>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-links" onClick={toggleMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/rentals" className="nav-links" onClick={toggleMenu}>
                            Rentals
                        </NavLink>
                    </li>
                    {/* <li className="nav-item">
            <NavLink to="/pricing" className="nav-links" onClick={toggleMenu}>
              Pricing
            </NavLink>
          </li> */}
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-links" onClick={toggleMenu}>
                            About Us
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className="nav-links" onClick={toggleMenu}>
                            Contact
                        </NavLink>
                    </li>
                    {user && user.isAdmin && (
                        <li className="nav-item">
                            <NavLink to="/admin" className="nav-links" onClick={toggleMenu}>
                                Admin
                            </NavLink>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link to="/cart" className="nav-links cart-icon" onClick={toggleMenu}>
                            <ShoppingCart size={20} />
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </Link>
                    </li>
                    <li className="nav-item">
                        {user ? (
                            <div className="user-menu">
                                <span className="user-name">Hi, {user.name}</span>
                                <button onClick={logout} className="btn-logout">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="nav-links-mobile" onClick={toggleMenu}>
                                Login
                            </Link>
                        )}
                    </li>
                    {!user && (
                        <li className="nav-btn">
                            <Link to="/login" className="btn btn-outline">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
