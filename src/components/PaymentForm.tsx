
import React from "react";

import { CardElement } from "@stripe/react-stripe-js";
import { useStripeController } from "../helpers/hooks/useStripeController";


type Props = {
  config?: any;
}

const StripeCheckout: React.FunctionComponent<Props> = ({ config }): JSX.Element => {  
  const stripe = useStripeController();

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
          ref={stripe.form.styles.error}/>
        <button id="submit" ref={stripe.form.styles.button}>
          <div 
            id="spinner" 
            className="spinner hidden" 
            ref={stripe.form.styles.spinner}/>
          <span id="button-text" ref={stripe.form.styles.text}>{'Pay'}</span>
          <span id="order-amount">{''}</span>
        </button>
      </form>
      <div className="sr-result hidden">
        <p>{'Payment completed'}<br /></p>
        <pre>
          <code></code>
        </pre>
      </div>
    </div>
  );
};

export default StripeCheckout;
