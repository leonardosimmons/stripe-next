
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product, ProductCard as ProductCardType } from '../utils/types/custom/types';

import styles from '../containers/pages/index/Index.module.scss';
import layoutStyles from '../containers/layout/Layout.module.scss';
import productStyles from '../components/card/ProductCard.module.scss';

import Layout from '../containers/layout/layout';
import PaymentForm from '../components/payment-form/PaymentForm';
import Container from '../components/base/Container';
import Heading from '../components/base/Heading';
import Grid from '../components/grid/Grid';
import ProductCard from '../components/card/ProductCard';


export const getStaticProps: GetStaticProps = async () => {
  let buffer: Array<Product> | null;
  let products: Array<ProductCardType> = [];
  try {
    const res: AxiosResponse = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCTS as string);
  
    if (res.status === 200) {
      // remove unwanted products
      buffer = res.data.payload.filter((product: Product) => product.meta.id !== 213572841 && product.meta.id !== 213812735);
      products = buffer!.map((p: Product) => ({
        img: {
          src: p.preview.image.src,
          alt: p.preview.image.alt,
          objectFit: 'contain'
        },
        text: p.details.name.toUpperCase(),
        btn: {
          text: 'DISCOVER MORE',
          link: p.preview.link,
          classes: 'btn-activeFocus'
        },
        price: p.details.price
      })
      );
    }
  
    return {
      props: {
        products: products as Array<ProductCardType>
      }
    };
  }
  catch(err) {
    throw new Error(err.message);
  }
};


function Index({ products }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <Layout
      title={'Demo | Stripe - Next.js Integration'}
      styles={layoutStyles}
      classes={'noselect'}
    >
      <Container type="wrapper" styles={styles}>
        <Heading type="main" styles={styles}>
          <span>{'Stripe/Next.js'}</span>
          <span>{'Integration Demo'}</span>
        </Heading>
        <Container type="container" styles={styles}>
          <Heading type="sub" styles={styles}>
            {'MONTHLY'}
          </Heading>
          <Grid even grid={styles.grid}>
            {products.map((product: ProductCardType, index: number) => (
              <div className={styles.cardBox}>
                <label htmlFor={`product-${index+1}`}>
                  <ProductCard 
                    fill
                    priority
                    key={index} 
                    styles={productStyles} 
                    card={product}
                  />
                </label>
                <input 
                  type="radio" 
                  id={`product-${index+1}`} 
                  name={'product'} 
                  value={product.price} 
                />
              </div>
            ))}
          </Grid>
        </Container>
        <PaymentForm />
      </Container>
    </Layout>
  );
};

export default Index;
