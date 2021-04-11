import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from 'react-router-dom';

const Shop = () => {
 // const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  useEffect(() => {
    const savedCard = getDatabaseCart();
    const productKeys = Object.keys(savedCard);
    fetch('http://localhost:5000/productsByKeys', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
  }, []);

  const handleAddProduct = (product) => {
    const toBbeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBbeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBbeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {
          products.length === 0 && <p>Loading...</p>
        }
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
