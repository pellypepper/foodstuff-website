import React, { useState, useEffect } from "react";
import ProductCard from "./productcard";
import Spinner from "../spinner"; // Import the spinner component
import "./product.css";

const ProductSlider = ({ addToCart, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsPerPage = 10;

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
            } finally {
                setLoading(false);
            }
            
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNext = () => {
        if (currentIndex + itemsPerPage < filteredProducts.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const currentProducts = filteredProducts.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    return (
        <div>
            {loading ? ( // Show spinner while loading
                <Spinner />
            ) : (
                <>
                    <div className="product-container">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
                                />
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                    {filteredProducts.length > itemsPerPage && (
                        <div className="navigation-buttons">
                            <button
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={
                                    currentIndex + itemsPerPage >=
                                    filteredProducts.length
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductSlider;
