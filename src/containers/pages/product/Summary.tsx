
import React from 'react';
import { Combinable } from '../../../utils/types/custom/types';

import styles from './Summary.module.scss';

import Heading from '../../../components/base/Heading';
import Container from '../../../components/base/Container';
import Link from 'next/link';


type Props = {
  name: string;
  price: string;
};


const ProductSummary: React.FunctionComponent<Props> = ({ name, price }):JSX.Element => {
  return (
    <Container type="wrapper" styles={styles} classes={'relative noselect'}>
      <Heading 
        type="main" 
        styles={styles}
        body={<p className={styles.headingBody}>{`$${price}`}</p>}>
        {name}
      </Heading>
      <Link href={'/'}>
        <button className={`${styles.btn} btn-activeFocus btn-hoverConfig`}>
          {'Back to products'}
        </button>
      </Link>
    </Container>
  ); 
};

export default ProductSummary
