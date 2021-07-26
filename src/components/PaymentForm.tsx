
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
            !stripe.status.succeeded && !stripe.status.processing
            ? <>  
                <span 
                id="button-text" 
                ref={stripe.form.styles.text}>{'Pay'}</span>
                <span id="order-amount">{` ${formatAmount(testToken)}`}</span>
              </>
            : stripe.status.processing
              ? <span id="button-text" ref={stripe.form.styles.text}></span>
              : <span id="button-text" ref={stripe.form.styles.text}></span>
          }
        </button>
      </form>
      <div className="sr-result hidden" ref={stripe.form.styles.result}>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{'Payment completed'}<br /></p>
        <pre ref={stripe.form.styles.pre}>
          <iframe src="https://giphy.com/embed/l41lS0IgRIFkAuA5G" width="280" height="280" frameBorder="0" className="giphy-embed" style={{margin: '0 auto'}} allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dancing-friday-weekend-l41lS0IgRIFkAuA5G"></a></p>
        </pre>
      </div>
    </div>
  );
};

export default StripeCheckout;
