
import React from 'react';


function useStripeFormController(stripe: any) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const preRef = React.useRef<HTMLPreElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);
  const spinnerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);

  // Disables pay button if stripe is not available
  React.useEffect(() => {
    if (!stripe.current) {
      buttonRef.current!.disabled = true;
      return;
    }
  }, []);
  
  // controls loading spinner
  React.useEffect(() => {
    if (stripe.loading) {
      buttonRef.current!.disabled = true;
      spinnerRef.current!.classList.remove("hidden");
      textRef.current!.classList.add("hidden");
    } else {
      buttonRef.current!.disabled = false;
      spinnerRef.current!.classList.add("hidden");
      textRef.current!.classList.remove("hidden");
    }
  }, [stripe.loading]);

  return {
    button: buttonRef,
    error: errorRef,
    form: formRef,
    pre: preRef,
    result: resultRef,
    spinner: spinnerRef,
    text: textRef
  }
};

export { useStripeFormController };
