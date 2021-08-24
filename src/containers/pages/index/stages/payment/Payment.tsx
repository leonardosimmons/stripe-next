
import React from 'react';

import styles from './Payment.module.scss';

import Container from '../../../../../components/base/Container';
import StripeCheckout from '../../../../../components/stripe/StripeCheckout';


type Props = {

};


const PaymentForm: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <Container type="wrapper">
      <StripeCheckout />
    </Container>
  );
};

export default PaymentForm;