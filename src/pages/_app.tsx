
import '../styles';
import '../styles/normalize.css';
import type { AppProps } from 'next/app';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getStripeKey } from '../helpers/config';
import DemoContextProvider from '../context/DemoContext';
import StatusContextProvider from '../context/StatusContext';

const stripePromise: Promise<Stripe | null> = getStripeKey().then((key: string | void) => loadStripe(key as string));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <StatusContextProvider>
        <DemoContextProvider>
          <Component {...pageProps} />
        </DemoContextProvider>    
      </StatusContextProvider>
    </Elements>
  )
};
