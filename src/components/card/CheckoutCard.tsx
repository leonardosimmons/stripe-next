

import React from 'react';
import Image from 'next/image';

import { Product } from '../../utils/types/custom/types';

import styles from './CheckoutCard.module.scss';
import Container from '../base/Container';
import Grid from '../grid/Grid';
import Heading from '../base/Heading';




type Props = {
  product: Product;
};


const ProductCheckoutCard: React.FunctionComponent<Props> = ({ product }): JSX.Element => {
  return (
    <Container type="wrapper" styles={styles} classes={'noselect'}>
      <Container type="box" styles={styles}>
        <Grid even grid={styles.grid}>
          <div className={`${styles.imgBox} relative`}>
            <Image 
              src={product.preview.image.src}
              alt={'product'}
              layout={'fill'}
              objectFit={'contain'}
            />
          </div>
          <div className={styles.detailsBox}>
            <Heading 
              type="sub"
              classes={styles.detailsHeading}
              body={
                <p>
                  <span>{`Style# ${product.details.style}`}</span>
                </p>
              }
            >
              {product.details.name}
            </Heading>
            <Grid even grid={styles.optionsGrid}>
            <div className={styles.optionsBox}>
              <p>{`QTY: 1`}</p>
            </div>
            <div className={styles.optionsBox}>
              <div className={styles.priceBox}>
                <span>{'$' + product.details.price.toLocaleString()}</span>
              </div>
            </div>
          </Grid>
          </div>
        </Grid>
      </Container>
    </Container>
  );
};

export default ProductCheckoutCard;
