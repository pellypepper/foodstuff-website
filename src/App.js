
import './App.css';
import Home from  './pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payment from "./pages/payment/payment";
import Detail from './pages/details/detail';
import Card from './pages/card/card';
import ProductDisplay from './pages/productdisplay/display';

import Checkout from "./pages/checkout/checkout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/card" element={< Card/>} />
                <Route path="/detail" element={<Detail/>} />
                <Route path="/display" element={<ProductDisplay/>} />
            </Routes>
        </Router>
    );
}

export default App;