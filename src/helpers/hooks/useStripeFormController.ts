
import React from 'react';
import { Stripe } from '@stripe/stripe-js';


function useStripeFormController(stripe: Stripe, loading: boolean) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const preRef = React.useRef<HTMLPreElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);
  const spinnerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);

  // Disables pay button if stripe is not available
  React.useEffect(() => {
    if (!stripe) {
      buttonRef.current!.disabled = true;
      return;
    }
  }, []);
  
  // controls loading spinner
  React.useEffect(() => {
    if (loading) {
      buttonRef.current!.disabled = true;
      spinnerRef.current!.classList.remove("hidden");
      textRef.current!.classList.add("hidden");
    } else {
      buttonRef.current!.disabled = false;
      spinnerRef.current!.classList.add("hidden");
      textRef.current!.classList.remove("hidden");
    }
  }, [loading]);

  function orderCompleted(note: string) {
    formRef.current!.classList.add("hidden");

    resultRef.current!.classList.remove("hidden");
    setTimeout(() => {
      resultRef.current!.classList.add("expand");
    }, 200);
  };

  return {
    completed: orderCompleted,
    button: buttonRef,
    error: errorRef,
    pre: preRef,
    result: resultRef,
    spinner: spinnerRef,
    text: textRef,
    wrapper: formRef,
  }
};

export { useStripeFormController };
