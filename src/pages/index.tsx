
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import CreditCardForm from '../components/CreditCardForm';


const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Index: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="sr-root">
      <div className="sr-main">
        <form id="payment-form" className="sr-payment-form">
          <div className="sr-combo-inputs-row">
            <div className="sr-input sr-card-element" id="card-element">
            <Elements stripe={stripePromise}>
              <CreditCardForm />
            </Elements>
            </div>
          </div>
          <div className="sr-field-error" id="card-errors" role="alert"></div>
          <button id="submit">
            <div className="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay</span><span id="order-amount"></span>
          </button>
        </form>
        <div className="sr-result hidden">
          <p>Payment completed<br /></p>
        </div>
      </div>
    </div>
  );
};

export default Index;
