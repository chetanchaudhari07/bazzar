import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
function Cart() {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${orderId}`); 
        setOrder(response.data); 
        setLoading(false); 
      } catch (err) {
        setError('Error fetching order');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]); 

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <div>
        <h2>Order Status: {order.status}</h2>
        <h3>Buyer Information:</h3>
        <p>Name: {order.buyer.name}</p>
        <p>Contact Info: {order.buyer.contactInfo}</p>
        <p>Address: {order.buyer.address}</p>

        <h3>Items:</h3>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <h4>{item.product.name}</h4>
              <p>Price: ${item.product.pricePerUnit}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cart;
