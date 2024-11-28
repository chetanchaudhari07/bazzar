import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import OrderPage from "./component/OrderPage";
import Cart from "./component/Cart";

function App() {
  const token = localStorage.getItem("token");
  return (
   <>
   
    <Router>
    <Header/>
      <Routes>
      <Route path="/order" element={<OrderPage token={token} />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart/:orderId" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

      </Routes>
    </Router>
   </>
  );
}

export default App;
