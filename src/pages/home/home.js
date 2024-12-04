import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import ProductSlider from "../../component/product/product";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [products, setProducts] = useState([]);

    const addToCart = async (product, quantity) => {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        let updatedCart;

        if (existingProductIndex > -1) {
            // Update quantity if product exists
            updatedCart = cart.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: item.quantity + parseInt(quantity) }
                    : item
            );
        } else {
            // Add new product to cart
            updatedCart = [...cart, { ...product, quantity: parseInt(quantity) }];
        }

        setCart(updatedCart); // Update the local cart state
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage

        try {
            // Send updated cart or new item to backend
            await fetch("http://localhost:4000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ product, quantity }),
            });
            setAlertMessage(`${product.name} has been added to the cart.`);
        } catch (error) {
            console.error("Error updating cart on server:", error);
        }
    };

    const removeFromCart = async (productName) => {
        const updatedCart = cart.filter(item => item.name !== productName);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage

        try {
            await fetch("http://localhost:4000/cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productName }),
            });
            setAlertMessage(`${productName} has been removed from the cart.`);
        } catch (error) {
            console.error("Error removing item from server:", error);
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("http://localhost:4000/cart");
                const cartData = await response.json();
                setCart(cartData); // Sync the cart state
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setFadeOut(true);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setFadeOut(false);
        }
    }, [alertMessage]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:4000/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Could not fetch products. Please try again later.");
            }
        };

        fetchProducts();
    }, []);

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
                    removeFromCart={removeFromCart} // Ensure to pass the remove function
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
