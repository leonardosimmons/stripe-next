
import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';


function useStripeController() {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const http: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_API });

  function orderComplete(stripe: Stripe, clientSecret: string, fn: () => void) {
    stripe.retrievePaymentIntent(clientSecret).then((result) => {
      const paymentIntent = result.paymentIntent;
      const paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
        
      document.querySelector(".sr-payment-form")!.classList.add("hidden");
      document.querySelector("pre")!.textContent = paymentIntentJson;

      document.querySelector(".sr-result")!.classList.remove("hidden");
      setTimeout(() => {
        document.querySelector(".sr-result")!.classList.add("expand");
      }, 200);
    
      setIsLoading(false);
    });
  };

  function showError(errorMsgText: string, el: Element) {
    setIsLoading(false);
    const errorMsg: Element = el;
    errorMsg!.textContent = errorMsgText;
    setTimeout(() => {
      errorMsg!.textContent = "";
    }, 4000);
  };

  async function setupCardElement(key: string, elements: StripeElements, id: string, styles?: any) {
    const stripe: Stripe | null = await loadStripe(key);
    const style: any = styles;
  
    const card: StripeCardElement = elements.create("card", { style: style });
    card.mount(id);
  
    return {
      stripe: stripe,
      card: card
    };
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    const key: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

    console.log(key)
    // create a payment intent
  };

  return {
    completeOrder: orderComplete,
    current: stripe,
    error: showError,
    elements,
    loading: isLoading,
    submit,
    setup: {
      card: setupCardElement 
    }
  };
};

export { useStripeController };
