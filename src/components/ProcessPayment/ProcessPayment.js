import React from "react";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IhdoRAdXkmvhuXH6mP8OuiRHVkpzn5DEBTuAeEssky0uuOI1kvFwp42GbtTWvYIcunHlCaRsUEqXAb5QTc5TQ8A00SUu0SxqV");

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
