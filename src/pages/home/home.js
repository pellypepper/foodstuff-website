import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import ProductSlider from "../../component/product/product";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message

    const products = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        img: "/product.jpg",
        name: `Product ${index + 1}`,
        price: 20,
    }));

    const addToCart = (product, quantity) => {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        let updatedCart;

        if (existingProductIndex > -1) {
            updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + parseInt(quantity) }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: parseInt(quantity) }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setAlertMessage(`${product.name} has been added to the cart.`); // Set alert message
    };



    const [fadeOut, setFadeOut] = useState(false); 

useEffect(() => {
    if (alertMessage) {
        const timer = setTimeout(() => {
            setFadeOut(true); 
            const removeAlertTimer = setTimeout(() => {
                setAlertMessage(""); 
                setFadeOut(false);
            }, 500); 

            return () => clearTimeout(removeAlertTimer);
        }, 5000); // Keep alert message visible for 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
}, [alertMessage]);


    return (
        <main className="Home">
            <section>
                <Navbar cart={cart} setCart={setCart} setSearchQuery={setSearchQuery} />
            </section>

            <section className="home-text-wrapper">
                <div className="row p-5 text-center">
                    <div className="home-text">
                        <h1>Welcome to FoodStuff</h1>
                        <span>Where you can find the best food products</span>
                    </div>
                    <div className="home-btn d-flex flex-column flex-md-row justify-content-center mt-4">
                        <button className="col-12 col-md-4 my-1 mx-1">New Product</button>
                        <button className="col-12 col-md-4 my-1 mx-1">All Products</button>
                        <button className="col-12 col-md-4 my-1 mx-1">Our Favorites</button>
                    </div>
                </div>
            </section>

            <section>
                <ProductSlider
                    products={products}
                    addToCart={addToCart}
                    searchQuery={searchQuery} // Pass the search query to ProductSlider
                />
            </section>

            {alertMessage && (
    <div className={`alert-popup ${fadeOut ? 'alert-popup-exit' : ''}`}>
        {alertMessage}
    </div>
)}


            <section className="footer mt-5">
                <Footer />
            </section>

            <div className="whatsapp-logo">
                <a
                    href="https://wa.me/1234567890" // Replace with your WhatsApp number
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-button"
                >
                    <FaWhatsapp size={40} color="#25D366" />
                </a>
            </div>
        </main>
    );
}
