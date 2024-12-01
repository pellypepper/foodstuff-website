import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const updateQuantity = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta)); // Ensures quantity never goes below 1
    };

    const handleProductDisplay = (e) => {
        e.preventDefault();
        navigate("/display", { state: { product } });
    };

    return (
        <div className="product-card card">
            <img
                onClick={handleProductDisplay}
                src={product.img}
                className="card-img"
                alt={product.name}
            />
            <div className="card-body">
                <p className="card-title">{product.name}</p>
                <span className="card-text">${product.price.toFixed(2)}</span>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addToCart(product, quantity);
                    }}
                    className="row p-1 product-form"
                >
                    <div className="quantity-controls">
                        <button
                            type="button"
                            className="quantity-button"
                            onClick={() => updateQuantity(-1)}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                            type="button"
                            className="quantity-button"
                            onClick={() => updateQuantity(1)}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    <button type="submit" className="mt-2 rounded-bottom">
                        Add to Cart
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductCard;
