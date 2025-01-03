import React, { useState, useEffect } from "react";
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import Country from "../../component/search/country";
import { useNavigate } from "react-router-dom";
import ShippingMethod from "../../component/shippingmethod/shippingmethod";
import "./checkout.css";

export default function Checkout() {
    const loadCart = () => JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, setCart] = useState(loadCart());
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        number: "",
        address: "",
        shippingMethod: "standard",
        total: 0,
    });

    const shippingFees = {
        standard: 10,
        express: 20,
        "cash-on-delivery": 0,
    };

    // Update cart in both state and localStorage
    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

 
    const removeFromCart = (index) => {
        const productName = cart[index].name; // Get the product name for the alert
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCart(updatedCart);
        setAlertMessage(`${productName} has been removed from the cart.`); // Set alert message
    };


    // Calculate the total cost including shipping fee
    const calculateTotal = () => {
        const subtotal = cart.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
        const shippingCost = shippingFees[form.shippingMethod] || 0;
        return subtotal + shippingCost;
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Handle order submission
    const handleOrderSubmit = (e) => {
        e.preventDefault();
        const total = calculateTotal();
        navigate("/payment", { state: { total ,cart, form} });
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
        <main className="checkout-section">
            <section>
                <Navbar />
            </section>
            <section className="checkout-main">
                <div className="checkout-container">
                    <div className="cart-section">
                        <h2>Your Cart</h2>
                        <div className="cart-list">
                            {cart.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                cart.map((product, index) => (
                                    <div key={index} className="cart-item">
                                        <div className="cart-item-details">
                                            <p>{product.name}</p>
                                            <p>
                                                ${product.price} x {product.quantity} = $
                                                {(product.price * product.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                        <button onClick={() => removeFromCart(index)}>Remove</button>
                                    </div>
                                ))
                            )}
                        </div>
                        {alertMessage && (
                <div className={`alert-popup ${fadeOut ? 'alert-popup-exit' : ''}`}>
                    {alertMessage}
                </div>
            )}
                        <div className="shipping-wrapper">
                            <h3>Shipping Method</h3>
                            <ShippingMethod
                                shippingMethod={form.shippingMethod}
                                handleChange={handleInputChange}
                            />
                        </div>
                        <div className="cart-total mt-3">
                            <h4>Items: {cart.length}</h4>
                            <h4>Total: ${calculateTotal().toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="checkout-form-section">
                        <h2>Checkout Details</h2>
                        <form onSubmit={handleOrderSubmit}>
                            <div className="input-wrapper">
                                <input
                                    placeholder="First Name"
                                    className="col-6 p-2"
                                    type="text"
                                    name="firstname"
                                    value={form.firstname}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    placeholder="Last Name"
                                    className="col-5 p-2"
                                    type="text"
                                    name="lastname"
                                    value={form.lastname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    placeholder="Email"
                                    className="col-6 p-2"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    placeholder="Phone Number"
                                    className="col-5 p-2"
                                    type="number"
                                    name="number"
                                    value={form.number}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Shipping Address"
                                name="address"
                                value={form.address}
                                onChange={handleInputChange}
                                required
                                className="col-12 p-2"
                            />
                            <Country />
                            <input
                                placeholder="Zip/Postal code"
                                type="text"
                                className="col-12 p-2"
                                required
                            />
                            <button type="submit">Proceed to Payment</button>
                        </form>
                    </div>
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </main>
    );
}
