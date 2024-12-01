import React, { useState } from "react";
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './display.css';

export default function ProductDisplay() {
    const location = useLocation();
    const product = location.state?.product || {};
    const navigate = useNavigate();

    const rating = Math.floor(Math.random() * 5) + 1;
    const stars = Array.from({ length: 5 }, (v, i) => (i < rating ? solidStar : regularStar));
    // Initialize cart state from localStorage
    const loadCart = () => JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(loadCart());

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const increaseQuantity = () => {
        const updatedCart = cart.map((item) =>
            item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
    };

    const decreaseQuantity = () => {
        const updatedCart = cart.map((item) =>
            item.name === product.name && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(updatedCart);
    };

    // Navigate to checkout page
    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <main>
            <section>
                <Navbar />
            </section>
            <section className="product-section my-4 container">
           
                    <div className="product-wrapper row p-4 ">
                        <div className="product-image col-12 col-md-6">
                            <img src={product.img} className="w-100" alt={product.name} />
                        </div>
                        <div className="product-text mt-4 mt-md-0 col-12 col-md-6">
                            <h1>{product.name}</h1>
                            <h3>Price: ${product.price.toFixed(2)}</h3>
                            <div className="rating">
                                {stars.map((star, index) => (
                                    <FontAwesomeIcon key={index} icon={star} className="star" />
                                ))}
                            </div>
                            <p>Quantity</p>
                            <div className="quantity-controls">
                                <button className="btn-1" onClick={decreaseQuantity}>-</button>
                                <span>{cart.find(item => item.name === product.name)?.quantity || 1}</span>
                                <button className="btn-1" onClick={increaseQuantity}>+</button>
                            </div>

                            <div className="reviews">

                                <p>Reviews</p>
                                <span>Pickup available within liverpool</span>
                                <span>Usually ready in 24 Hours</span>
                            </div>
                            <button className="btn" onClick={handleCheckout}>Proceed to Checkout</button>
                        </div>
                    </div>
         
            </section>
            <section>
                <Footer />
            </section>
        </main>
    );
}
