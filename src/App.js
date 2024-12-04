
import './App.css';
import Home from  './pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payment from "./pages/payment/payment";
import Detail from './pages/details/detail';
import Card from './pages/card/card';
import ProductDisplay from './pages/productdisplay/display';
import { Elements } from '@stripe/react-stripe-js'; 
import Checkout from "./pages/checkout/checkout";
import AdminDashboard from './pages/adminDashboard/admin';

const stripePromise = loadStripe('pk_test_51QRXGxBlRPuLLUxXKbMlflbrE4ghJsLt9PkDkh47BNvc9sKbSsF7Fi48bZVeC29Za5LKKIaHe9g935Jeh2Mj1vc600gVvRCsQw'); // Use your actual publishable key


function App() {
    return (
        <Elements stripe={stripePromise}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} /> 
                <Route path="/payment" element={<Payment/>} />
                <Route path="/card" element={< Card  />} />
                <Route path="/detail" element={<Detail/>} />
                <Route path="/display" element={<ProductDisplay/>} />
            </Routes>
        </Router>
        </Elements>
    );
}

export default App;