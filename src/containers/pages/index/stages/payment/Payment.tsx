
import React from 'react';

import styles from './Payment.module.scss';

import { Product } from '../../../../../utils/types/custom/types';
import { Context } from '../../../../../context/DemoContext';

import Container from '../../../../../components/base/Container';
import StripeCheckout from '../../../../../components/stripe/StripeCheckout';
import ProductCheckoutCard from '../../../../../components/card/CheckoutCard';


type Props = {
  products: Array<Product>;
};


const PaymentForm: React.FunctionComponent<Props> = ({ products }): JSX.Element => {
  const context = React.useContext(Context);
  const [ selected, setSelected ] = React.useState<Array<Product>>([]);

  // generates checkout cards
  React.useEffect(() => {
    let buffer: Array<Product> = [];
    context.state.selectedProducts.map((id: number) => {
      products.map((prod: Product) => {
        if (prod.meta.id === id) {
          buffer.push(prod);
        }
      })
    });
    setSelected(buffer);
  }, []);

  return (
    <Container type="wrapper" styles={styles}>
      {selected.map((prod: Product) => (
        <ProductCheckoutCard product={prod} />
      ))}
      <StripeCheckout />
    </Container>
  );
};

export default PaymentForm;