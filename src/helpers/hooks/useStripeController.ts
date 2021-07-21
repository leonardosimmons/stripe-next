
import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { loadStripe, PaymentIntent, PaymentIntentResult, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useStripeFormController } from './useStripeFormController';


function useStripeController() {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const form = useStripeFormController(stripe as Stripe, isLoading);
  const http: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_API });

  async function orderComplete(stripe: Stripe, clientSecret: string) {
    await stripe.retrievePaymentIntent(clientSecret).then((result: PaymentIntentResult) => {
      const paymentIntent: PaymentIntent | undefined = result.paymentIntent;
      const paymentIntentJson: string = JSON.stringify(paymentIntent, null, 2);
        
      form.wrapper.current!.classList.add("hidden");
      form.pre.current!.textContent = paymentIntentJson;

      form.result.current!.classList.remove("hidden");
      setTimeout(() => {
        form.result.current!.classList.add("expand");
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

  async function setupCardElement(key: string, elements: StripeElements, id: string, form?: any) {
    const stripe: Stripe | null = await loadStripe(key);
    const style: any = form;
  
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
    }
  };
};

export { useStripeController };
