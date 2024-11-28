import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [buyer, setBuyer] = useState({
    name: "",
    contactInfo: "",
    address: "",
  });
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data); 
      } catch (error) {
        setMessage("Error fetching products");
      }
    };

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchProducts(); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/orders",
        { buyer, items },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Order placed successfully!");
    } catch (error) {
      setMessage("Error placing order: " + error.response?.data?.message || error.message);
    }
  };

  if (!token) {
    return <p>You need to be logged in to place an order.</p>;
  }

  return (
    <div>
      <h1>Place Your Order</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <h3>Buyer Details</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={buyer.name}
          onChange={handleBuyerChange}
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={buyer.contactInfo}
          onChange={handleBuyerChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={buyer.address}
          onChange={handleBuyerChange}
          required
        />

        <h3>Order Items</h3>
        {items.map((item, index) => (
          <div key={index}>
            <select
              value={item.productId}
              onChange={(e) =>
                handleItemChange(index, "productId", e.target.value)
              }
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              min="1"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderPage;
