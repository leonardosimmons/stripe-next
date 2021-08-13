
import React from "react";

import styles from './PaymentForm.module.scss';

import { CardElement } from "@stripe/react-stripe-js";
import { useStripeController } from "../../helpers/hooks/useStripeController";
import { formatAmount } from "../../helpers/functions";
import { AmountToken } from "../../utils/types/custom/types";


const testToken: AmountToken = {
  amount: 450.45,
  quantity: 1,
  currency: 'usd'
};

const StripeCheckout: React.FunctionComponent = (): JSX.Element => {  
  const { errorCheck, form, status, submit } = useStripeController();

  return (
    <div className={styles.main}>
      <form 
        id="payment-form" 
        className={styles.paymentForm} 
        onSubmit={submit}
        ref={form.styles.wrapper}
      >
        <div className={styles.comboInputsRow}>
          <div id="card-element" className={`${styles.input} ${styles.cardElement}`}>
            <CardElement onChange={errorCheck}/>
          </div>
        </div>
        <div 
          id="card-errors" 
          className={styles.fieldError} 
          role="alert"
          ref={form.styles.error}>
        { status.error 
          ? status.error
          : null  
        }    
        </div>
        <button 
          id="submit" 
          className={styles.button}
          ref={form.styles.button}
          disabled={status.disabled || status.processing || status.succeeded}>
          <div 
            id="spinner" 
            className="spinner hidden" 
            ref={form.styles.spinner}/>
          {
            !status.succeeded && !status.processing
            ? <>  
                <span 
                id="button-text" 
                ref={form.styles.text}>{'Pay'}</span>
                <span id="order-amount">{` ${formatAmount(testToken)}`}</span>
              </>
            : status.processing
              ? <span id="button-text" ref={form.styles.text}></span>
              : <span id="button-text" ref={form.styles.text}></span>
          }
        </button>
      </form>
      <div className={`${styles.result} hidden`} ref={form.styles.result}>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{'Payment completed'}<br /></p>
        <pre ref={form.styles.pre}>
          <iframe src="https://giphy.com/embed/l41lS0IgRIFkAuA5G" width="280" height="280" frameBorder="0" className="giphy-embed" style={{margin: '0 auto'}} allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dancing-friday-weekend-l41lS0IgRIFkAuA5G"></a></p>
        </pre>
      </div>
    </div>
  );
};

export default StripeCheckout;
