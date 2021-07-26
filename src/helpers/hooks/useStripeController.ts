
import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { 
  loadStripe, 
  PaymentIntent, 
  PaymentIntentResult, 
  Stripe, 
  StripeCardElement, 
  StripeElements 
} from '@stripe/stripe-js';

import { useStripeFormController } from './useStripeFormController';


const testItems = [
  {id: 123456789},
  {id: 987654321},
  {id: 543216789},
  {id: 647583921},
];

function useStripeController() {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();
  const http: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_API });
  
  const [ succeeded, setSucceeded ] = React.useState<boolean>(false);
  const [ processing, setProcessing ] = React.useState<boolean>(false);
  const [ clientSecret, setClientSecret ] = React.useState<string>('');
  const [ disabled, setDisabled ] = React.useState<boolean>(false);
  const [ error, setError ] = React.useState<string | null>('');
  
  const form = useStripeFormController(stripe as Stripe, processing);

  // Create payment intent on page load
  React.useEffect(() => {
    http.post(process.env.NEXT_PUBLIC_CREATE_PAYMENT_INTENT_API!, { currency: 'usd', items: testItems })
      .then((res) => res.data)
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => showError('Unable to load Stripe'));
  }, []);


  // handles errors user may encounter while typing
  function handleChange(e: any): void {
    setDisabled(e.empty);
    showError(e.message);
  };

  async function orderComplete(stripe: Stripe, clientSecret: string) {
    try {
      await stripe.retrievePaymentIntent(clientSecret)
        .then((result: PaymentIntentResult) => {
          const paymentIntent: PaymentIntent | undefined = result.paymentIntent;
          const paymentIntentJson: string = JSON.stringify(paymentIntent, null, 2);
            
          form.completed(paymentIntentJson);
        
          setProcessing(false);
        }
      );
    }
    catch(err) {
      showError('Something went wrong! Unable to complete this transaction.');
    }
  };

  function showError(errorMsgText: string) {
    setProcessing(false);
    let errorMsg: string = errorMsgText;
    setError(errorMsg);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  async function setupCardElement(key: string, elements: StripeElements, id: string, form?: any) {
    try {
      const stripe: Stripe | null = await loadStripe(key);
      const style: any = form;
    
      const card: StripeCardElement = elements.create("card", { style: style });
      card.mount(id);
    
      return {
        stripe: stripe,
        card: card
      };
    }
     catch(err) {
       showError('Unable to load Stripe');
     }
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!
        }
      });
  
      if (payload?.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    }
    catch(err) {
      showError('Error: Unable to process your order at this time, please try again.');
    }
  };

  return {
    completeOrder: orderComplete,
    current: stripe,
    error: showError,
    errorCheck: handleChange,
    elements,
    processing: processing,
    submit,
    form: {
      styles: {
        button: form.button,
        error: form.error,
        pre: form.pre,
        result: form.result,
        spinner: form.spinner,
        text: form.text,
        wrapper: form.wrapper
      }
    },
    setup: {
      card: setupCardElement 
    },
    status: {
      succeeded,
      setSucceeded,
      processing,
      setProcessing,
      disabled,
      setDisabled,
      error,
      setError,
      clientSecret,
      setClientSecret
    }
  };
};

export { useStripeController };
