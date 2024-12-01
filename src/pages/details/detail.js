import React, { useState } from "react";
import Navbar from '../../component/navbar/navbar';
import Footer from '../../component/footer/footer';
import './detail.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useLocation } from "react-router-dom";

export default function Detail({ calculateTotal }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const location = useLocation();
    const total = location.state?.total || 0;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
                alert("File size exceeds 2MB limit");
                return;
            }
            setSelectedFile(file);
            console.log("File uploaded successfully", file.name);
        }
    };

    const handleUploadClick = () => {
        if (!selectedFile) {
            alert("Please select a file before uploading.");
            return;
        }
        console.log("Uploading file:", selectedFile.name);
        // Implement file upload logic here
    };

    return (
        <main>
            <section>
                <Navbar />
            </section>
            <section className="details-wrapper m-4 p-4">
                <div className="detail-info">
                    <span>Amount to pay:</span>
                    <h3>${total}</h3> {/* Display the calculated total amount */}
                </div>
                <h2>Payment Method: Bank Transfer</h2>
                <span className="span">
                    You can make a direct transfer of your order and upload proof of payment, as this will be used to verify your order.
                </span>
                <div className="details-acct">
                    <p>Account Name: <span>John Doe</span></p>
                    <p>Account Number: <span>123456789</span></p>
                    <p>Bank Name: <span>Sample Bank</span></p>
                </div>

                <div className="dropdown-detail">
                    <div 
                        className="dropdown-text-section" 
                        onClick={toggleDropdown} 
                        role="button" 
                        aria-expanded={isOpen}
                        aria-controls="dropdown-content"
                        tabIndex={0} 
                        onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
                        aria-labelledby="proof-of-payment-header"
                    >
                        <div className="text-section" id="proof-of-payment-header">
                            <p>Proof of payment</p>
                            <p>You can also add your proof of payment if available</p>
                        </div>
                        <div className="icon-section">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                    {isOpen && (
                        <div className="dropdown-content">
                            <div className="upload-section">
                                <input type="file" onChange={handleFileUpload} />
                                <button onClick={handleUploadClick}>Upload</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section>
                <Footer />
            </section>
        </main>
    );
}