
import React from "react";

import { CardElement } from "@stripe/react-stripe-js";
import { useStripeController } from "../helpers/hooks/useStripeController";
import { useStripeFormController } from "../helpers/hooks/useStripeFormController";


const StripeCheckout: React.FunctionComponent = (): JSX.Element => {  
  const stripe = useStripeController();
  const form = useStripeFormController(stripe);

  return (
    <div className="sr-main">
      <form 
        id="payment-form" 
        className="sr-payment-form" 
        onSubmit={stripe.submit}
      >
        <div className="sr-combo-inputs-row">
          <div id="card-element" className="sr-input sr-card-element">
            <CardElement />
          </div>
        </div>
        <div 
          id="card-errors" 
          className="sr-field-error" 
          role="alert"
          ref={form.error}/>
        <button id="submit" ref={form.button}>
          <div 
            id="spinner" 
            className="spinner hidden" 
            ref={form.spinner}/>
          <span id="button-text" ref={form.text}>Pay</span>
          <span id="order-amount"></span>
        </button>
      </form>
      <div className="sr-result hidden">
        <p>Payment completed<br /></p>
        <pre>
          <code></code>
        </pre>
      </div>
    </div>
  );
};

export default StripeCheckout;
