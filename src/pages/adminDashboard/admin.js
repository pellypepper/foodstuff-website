import React, { useEffect, useState } from 'react';
import './admin.css'; // Import the CSS file for styles
import { useNavigate } from 'react-router-dom'; // Import the navigate function from react-router-dom

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState({ id: '', name: '', price: '', img: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [salesData, setSalesData] = useState([]);

    const navigate = useNavigate(); 

    useEffect(() => {
        fetchProducts();
        fetchSalesData();
   
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchSalesData = async () => {
        try {
            const response = await fetch('http://localhost:4000/sales'); // Assuming sales endpoint
            const data = await response.json();
            setSalesData(data);
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

 

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await fetch(`http://localhost:4000/products/${productData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            } else {
                await fetch('http://localhost:4000/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            }
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const resetForm = () => {
        setProductData({ id: '', name: '', price: '', img: '' });
        setIsEditing(false);
    };

    const handleEdit = (product) => {
        setProductData(product);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:4000/products/${id}`, {
                method: 'DELETE',
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2 className="dashboard-title">Admin Dashboard</h2>

            {/* Basic Analytics Section */}
            <section className="analytics-section">
                <h3>Analytics Overview</h3>
                <div className="analytics-cards">
                    <div className="analytics-card">
                        <h4>Total Products</h4>
                        <p>{products.length}</p>
                    </div>
                    <div className="analytics-card">
                        <h4>Total Sales</h4>
                        <p>${salesData.reduce((total, sale) => total + sale.amount, 0).toFixed(2)}</p>
                    </div>
                    <div className="analytics-card">
                        <h4>Registered Users</h4>
                    </div>
                </div>
            </section>

            {/* Product Management Form */}
            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="Product Price"
                    required
                />
                <input
                    type="text"
                    name="img"
                    value={productData.img}
                    onChange={handleChange}
                    placeholder="Product Image URL"
                    required
                />
                <div className='d-flex btn-div'>
                    <button type="submit" className="submit-button">
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </button>
                    <button onClick={() => { navigate('/') }} className="submit-button">
                        Return to Homepage
                    </button>
                </div>
                {isEditing && <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>}
            </form>

            {/* Products List */}
            <h3 className="products-list-title">Products List</h3>
            <ul className="products-list row">
                {products.map(product => (
                    <li key={product.id} className="product-item col-12 col-md-6">
                        <h4>{product.name}</h4>
                        <p>Price: ${product.price}</p>
                        <img src={product.img} alt={product.name} className="product-image" />
                        <div className="product-actions">
                            <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

         
        </div>
    );
};

export default AdminDashboard;
