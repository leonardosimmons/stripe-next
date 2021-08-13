
import React from 'react';

import layoutStyles from '../containers/layout/Layout.module.scss';

import Layout from '../containers/layout/layout';
import PaymentForm from '../components/payment-form/PaymentForm';


const Index: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout
      title={'Home | Stripe - Next.js Integration'}
      styles={layoutStyles}>
      <PaymentForm />
    </Layout>
  );
};

export default Index;
