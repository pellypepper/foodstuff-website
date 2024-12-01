import React from 'react'; // Import useState
import Navbar from '../../component/navbar/navbar';
import Footer from '../../component/footer/footer';
import './payment.css'; 
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Payment() {
    const navigate = useNavigate();
    
   

    const location = useLocation();
const total = location.state?.total || 0;


    const handleGoBack = (e) => {
        e.preventDefault(); 
        navigate('/checkout');
    }

    const handleClick = (e) => {
        e.preventDefault();
        // Check which payment method is selected and navigate accordingly
        if(document.getElementById('bank-transfer').checked) {
            navigate('/detail', { state: { total } }); 
        } else {
            navigate('/card', );
        }
    }

    return (
        <main className="payment-main">
            <section>
                <Navbar />
            </section>
            <section className="payment-section">
                <h2 className="payment-title">Choose Payment Method</h2>
                <form className="payment-options">
                    <div className="payment-option">
                        <input type="radio" id="pay-online" name="payment" value="pay-online" />
                        <label htmlFor="pay-online">Pay Online</label>
                    </div>
                    <div className="payment-option">
                        <input type="radio" id="bank-transfer" name="payment" value="bank-transfer" />
                        <label htmlFor="bank-transfer">Pay Via Bank Transfer</label>
                    </div>
                    <div className='payment-btn d-flex justify-content-center'>
                        <button onClick={handleGoBack} className="payment-button" type="button">Go Back</button>
                        <button onClick={handleClick} className="payment-button" type="submit">Proceed to Pay</button>
                    </div>
                </form>
            </section>
            <section>
                <Footer />
            </section>
        </main>
    );
}
