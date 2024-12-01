import React, { useRef} from "react";
import { FaSearch, FaTimes, FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import Cart from "../cart/cart";
import { Link } from "react-router-dom";

export default function Navbar({ cart, setCart, setSearchQuery }) {
    const menuRef = useRef(null);
    const searchRef = useRef(null);
    const loginRef = useRef(null);
    const cartRef = useRef(null);

    const handleClick = () => {
        menuRef.current.classList.toggle("active");
    };
    const handleLogin = () => {
        loginRef.current.classList.toggle("active");
    };
    const handleSearch = () => {
        searchRef.current.classList.toggle("active");
    };
    const handleCart = () => {
        cartRef.current.classList.toggle("active");
    };
    const handleClose = () => {
        menuRef.current.classList.remove("active");
    };
    const handleClosed = () => {
        searchRef.current.classList.remove("active");
    };
    const handleLoginClose = () => {
        loginRef.current.classList.remove("active");
    };

    return (
        <main className="main">
            <div className="container-fluid">
                <div className="row h-100">
                    <div className="logo-wrapper col-6">
                        <Link to="/">FoodStuff</Link>
                    </div>
                    <nav className="col-6 d-flex justify-content-end">
                        <button onClick={handleSearch} className="rounded-pill">
                            <FaSearch className="icon" />
                        </button>
                        <button onClick={handleLogin} className="rounded-pill">
                            <FaUser className="icon" />
                        </button>
                        <button onClick={handleClick} className="rounded-pill">
                            <FaBars className="icon" />
                        </button>
                        <button onClick={handleCart} className="rounded-pill">
                            <FaShoppingCart className="icon" />
                        </button>
                    </nav>
                </div>
            </div>

            <aside className="side-menu" ref={menuRef}>
                <div onClick={handleClose} className="close-div">
                    <FaTimes className="times" />
                </div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <p></p>
                        <li>About</li>
                        <p></p>
                        <li>Services</li>
                        <p></p>
                        <li>Contact</li>
                        <p></p>
                    </ul>
                </nav>
            </aside>

            <form
                className="form"
                ref={searchRef}
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaTimes onClick={handleClosed} className="times" />
            </form>

            <div className="login" ref={loginRef}>
                <div className="login-wrapper">
                    <FaTimes onClick={handleLoginClose} className="times" />
                    <h3>LOGIN</h3>
                    <p className="border"></p>
                    <form>
                        <input placeholder="Email Address" type="email" />
                        <input placeholder="Password" type="password" />
                        <div className="remember-wrapper">
                            <div className="d-flex">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </div>
                            <a href="/">Forgot Password</a>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>

            <div ref={cartRef} className="cart">
                <Cart cartRef={cartRef} cart={cart} setCart={setCart} />
            </div>
        </main>
    );
}
