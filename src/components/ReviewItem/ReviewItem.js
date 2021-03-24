import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button 
            onClick={() => props.removeProduct(key)}
            className="main-btn">Remove Item</button>
        </div>
    );
};

export default ReviewItem;