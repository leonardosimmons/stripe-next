

import '../styles';
import '../styles/css/global.css';
import '../styles/css/normalize.css';
import type { AppProps } from 'next/app';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getStripeKey } from '../helpers/config';

const stripePromise: Promise<Stripe | null> = getStripeKey().then((key: string | void) => loadStripe(key as string));

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  {
    stripePromise &&
    <Elements stripe={stripePromise}>    
      <Component {...pageProps} />
    </Elements>
  }
  </>
  )
};