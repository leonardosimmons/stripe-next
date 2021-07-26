
import React from "react";

import { CardElement } from "@stripe/react-stripe-js";
import { useStripeController } from "../helpers/hooks/useStripeController";
import { formatAmount } from "../helpers/functions";
import { AmountToken } from "../utils/types/custom/types";


type Props = {
  config?: any;
}

const testToken: AmountToken = {
  amount: 450.45,
  quantity: 1,
  currency: 'usd'
};

const StripeCheckout: React.FunctionComponent<Props> = ({ config }): JSX.Element => {  
  const stripe = useStripeController();

  return (
    <div className="sr-main">
      <form 
        id="payment-form" 
        className="sr-payment-form" 
        onSubmit={stripe.submit}
        ref={stripe.form.styles.wrapper}
      >
        <div className="sr-combo-inputs-row">
          <div id="card-element" className="sr-input sr-card-element">
            <CardElement onChange={stripe.errorCheck}/>
          </div>
        </div>
        <div 
          id="card-errors" 
          className="sr-field-error" 
          role="alert"
          ref={stripe.form.styles.error}>
        { stripe.status.error 
          ? stripe.status.error
          : null  
        }    
        </div>
        <button 
          id="submit" 
          ref={stripe.form.styles.button}
          disabled={stripe.status.disabled || stripe.status.processing || stripe.status.succeeded}>
          <div 
            id="spinner" 
            className="spinner hidden" 
            ref={stripe.form.styles.spinner}/>
          {
            !stripe.status.succeeded 
            ? <>  
                <span 
                id="button-text" 
                ref={stripe.form.styles.text}>{'Pay'}</span>
                <span id="order-amount">{` ${formatAmount(testToken)}`}</span>
              </>
            : <span id="button-text" ref={stripe.form.styles.text}>{'Thank you'}</span>
          }
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
