
import React from 'react';
import { loadStripe, PaymentMethodResult, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

import styles from './Index.module.scss';


// connects to Stripe platform
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


const CheckoutForm: React.FunctionComponent = () => {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement) as StripeCardElement
    }) as PaymentMethodResult;
  
    if (error) {
      throw new Error(error.message);
    }

    console.log(paymentMethod);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CardElement />
      <button type={'submit'} disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

const Index: React.FunctionComponent = (): JSX.Element => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Index;
