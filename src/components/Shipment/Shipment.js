import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const[loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data) {
        processOrder();
        alert('Your order placed successfully')
      }
    })
  };

  

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Enter your name" />
      {errors.name && <span className="error">Name is required</span>}

      <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Enter your email" />
      {errors.email && <span className="error">Email is required</span>}{" "}

      <input {...register("address", { required: true })} placeholder="Your address" />
      {errors.address && <span className="error">Address is required</span>}{" "}

      <input {...register("phone", { required: true })} placeholder="Enter your phone number" />
      {errors.phone && <span className="error">Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
