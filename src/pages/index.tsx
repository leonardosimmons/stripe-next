
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product, ProductCard as ProductCardType } from '../utils/types/custom/types';

import styles from '../containers/pages/index/Index.module.scss';
import layoutStyles from '../containers/layout/Layout.module.scss';

import { StatusContext } from '../context/StatusContext';

import Layout from '../containers/layout/layout';
import Container from '../components/base/Container';
import ShippingForm from '../containers/pages/index/stages/shipping/Shipping';
import PaymentForm from '../containers/pages/index/stages/payment/Payment';
import Intro from '../containers/pages/index/stages/intro/Intro';
import ProductSelection from '../containers/pages/index/stages/selection/Selection';


const {
  NEXT_PUBLIC_GET_PRODUCTS
} = process.env;


export const getStaticProps: GetStaticProps = async () => {
  let buffer: Array<Product> = [];
  let cards: Array<ProductCardType> = [];
  try {
    const res: AxiosResponse = await axios.get(NEXT_PUBLIC_GET_PRODUCTS as string);
  
    if (res.status === 200) {
      buffer = res.data.payload.filter((product: Product) => product.meta.id !== 213572841 && product.meta.id !== 213812735);
      cards = buffer!.map((p: Product) => ({
        id: p.meta.id,
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
        price: p.details.price,
        checked: false
      })
      );
    }
  
    return {
      props: {
        cards: cards as Array<ProductCardType>,
        products: buffer as Array<Product>
      }
    };
  }
  catch(err) {
    throw new Error(err.message);
  }
};


function Index({ cards, products }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const status = React.useContext(StatusContext);

  return (
    <Layout
      title={'Demo | Stripe - Next.js Integration'}
      styles={layoutStyles}
      classes={'noselect'}
    >
      <Container type="wrapper" styles={styles}>
        {status.state.stage === 'start' &&
          <Intro />
        }
        {status.state.stage === 'selection' &&
          <ProductSelection 
            cards={cards} 
            products={products}
          />
        }
        {status.state.stage === "shipping" &&
          <ShippingForm />
        }
        {status.state.stage === 'payment' &&
          <PaymentForm products={products}/>
        }
      </Container>
    </Layout>
  );
};

export default Index;
