import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); 
        setProducts(response.data); 
        setLoading(false); 
      } catch (err) {
        setError('Error fetching products');
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Product Catalog</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
