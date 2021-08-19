
import React from 'react';
import { Combinable } from '../../../utils/types/custom/types';

import styles from './Summary.module.scss';

import Heading from '../../../components/base/Heading';
import Container from '../../../components/base/Container';


type Props = {
  id: Combinable;
  name: string;
  price: string;
  addToCart: (e: React.FormEvent) => void;
};


const ProductSummary: React.FunctionComponent<Props> = ({ id, name, price, addToCart }):JSX.Element => {
  return (
    <Container type="wrapper" styles={styles} classes={'relative noselect'}>
      <Heading 
        type="main" 
        styles={styles}
        body={<p className={styles.headingBody}>{`$${price}`}</p>}>
        {name}
      </Heading>
      <button className={`${styles.btn} btn-activeFocus btn-hoverConfig`}>{'SELECT'}</button>
    </Container>
  ); 
};

export default ProductSummary
