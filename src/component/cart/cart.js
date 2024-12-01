import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart({ cartRef }) {
    const loadCart = () => JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(loadCart());
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message

    // Update cart in both state and localStorage
    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    // Remove product from cart
    const removeFromCart = (index) => {
        const productName = cart[index].name; // Get the product name for the alert
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCart(updatedCart);
        setAlertMessage(`${productName} has been removed from the cart.`); // Set alert message
    };

    // Increase product quantity
    const increaseQuantity = (index) => {
        const updatedCart = cart.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
    };

    // Decrease product quantity
    const decreaseQuantity = (index) => {
        const updatedCart = cart.map((item, i) =>
            i === index && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(updatedCart);
    };

    // Close the cart
    const handleCartClose = () => {
        if (cartRef?.current) {
            cartRef.current.classList.remove("active");
        }
    };

    // Navigate to checkout page
    const handleCheckout = () => {
        navigate("/checkout");
    };

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setFadeOut(true); // Trigger fade out
                const removeAlertTimer = setTimeout(() => {
                    setAlertMessage(""); // Clear the alert after fade out
                    setFadeOut(false); // Reset fade out state
                }, 500); // Match this time with the CSS transition duration

                return () => clearTimeout(removeAlertTimer);
            }, 5000); // Keep alert message visible for 5 seconds

            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [alertMessage]);

    return (
        <main className="cart-main">
            {/* Cart Section */}
            <div className="cart-section">
                <div className="cart-section-text">
                    <FaTimes className="times" onClick={handleCartClose} />
                    <h2>Shopping Cart</h2>
                </div>
                <div className="cart-list">
                  <div className="cart-list-1">
                  {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map((product, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-details">
                                    <p>{product.name}</p>
                                    <p>${(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                                <div className="cart-item-controls">
                                    <div className="quantity-controls">
                                        <button className="btn-1" onClick={() => decreaseQuantity(index)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button className="btn-1" onClick={() => increaseQuantity(index)}>+</button>
                                    </div>
                                    <button className="btn-2" onClick={() => removeFromCart(index)}>Remove</button>
                                </div>
                             
                            </div>
                        ))
                    )}
                  </div>
                </div>
                <div className="cart-total">
                    <h4>
                        Total: $
                        {cart
                            .reduce(
                                (total, product) => total + product.price * product.quantity,
                                0
                            )
                            .toFixed(2)}
                    </h4>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
                
                
                {alertMessage && (
                    <div className={`alert-popup ${fadeOut ? 'alert-popup-exit' : ''}`}>
                        {alertMessage}
                    </div>
                )}
            </div>
        </main>
    );
}
