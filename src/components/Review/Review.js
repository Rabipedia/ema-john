import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const removeProduct = (productKey) => {
    console.log("remove clicked");
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  const reviewItemStyle = {
    borderBottom: "1px solid lightgray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewItemStyle} className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-conatiner">
            <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Review;
