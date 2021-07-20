
import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { 
  loadStripe, 
  PaymentMethod, 
  PaymentMethodResult, 
  Stripe, 
  StripeCardElement, 
  StripeElements 
} from '@stripe/stripe-js';

import { 
  Elements, 
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

import styles from './Index.module.scss';


// connects to Stripe platform
const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
const http: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_API });


// Form
type CheckoutFormProps = {
  amount: number;
};

const CheckoutForm: React.FunctionComponent<CheckoutFormProps> = ({ amount }) => {
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

    const { id } = paymentMethod as PaymentMethod;

    try {
      const { data } = await http.post(process.env.NEXT_PUBLIC_BASE_CHARGE_CARD_API as string, { id, amount });
      console.log(data);
    }
    catch (err) {
      console.log(err);
    }
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


// View
const Index: React.FunctionComponent = (): JSX.Element => {
  const [ amount, setAmount ] = React.useState<number>(8995);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default Index;
