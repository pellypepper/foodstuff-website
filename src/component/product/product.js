import React, { useState } from "react";
import ProductCard from "./productcard";
import "./product.css";


const ProductSlider = ({ products, addToCart, searchQuery }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsPerPage = 10;

    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handlers for navigation
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

    // Get the current slice of products
    const currentProducts = filteredProducts.slice(
        currentIndex,
        currentIndex + itemsPerPage
    );

    return (
        <div>
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
                    <button onClick={handlePrevious} disabled={currentIndex === 0}>
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={
                            currentIndex + itemsPerPage >= filteredProducts.length
                        }
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductSlider;