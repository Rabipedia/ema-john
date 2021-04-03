import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const[loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

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
