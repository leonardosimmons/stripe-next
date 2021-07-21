
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import CreditCardForm from '../components/PaymentForm';


const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


const Index: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="sr-root">
      <Elements stripe={stripePromise}>
        <CreditCardForm />
      </Elements>
    </div>
  );
};

export default Index;
