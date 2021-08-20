
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Product, ProductCard as ProductCardType } from '../utils/types/custom/types';

import styles from '../containers/pages/index/Index.module.scss';
import layoutStyles from '../containers/layout/Layout.module.scss';
import productStyles from '../components/card/ProductCard.module.scss';

import { Context } from '../context/DemoContext';

import Layout from '../containers/layout/layout';
import PaymentForm from '../components/payment-form/PaymentForm';
import Container from '../components/base/Container';
import Heading from '../components/base/Heading';
import Grid from '../components/grid/Grid';
import ProductCard from '../components/card/ProductCard';
import Toggle from '../components/toggle/ToggleSwitch';
import { StatusContext } from '../context/StatusContext';


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
        price: p.details.price
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
  const context = React.useContext(Context);
  const status = React.useContext(StatusContext);

  console.log(status);

  //* Payment type toggle
  function handlePaymentType(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.checked) {
      context.dispatch({ type: 'SET_PAYMENT_TYPE', payment: "monthly"});
      return;
    }
    context.dispatch({ type: 'SET_PAYMENT_TYPE', payment: "once"});
  };

  //* Form handling
  function handleSelected(e: React.ChangeEvent<HTMLInputElement>): void {
    let prods: Array<number> = [];
    const prod_id: number = parseInt(e.target.value);

    if (e.target.checked) {
      prods = context.state.selectedProducts;
      if (!prods.includes(prod_id)) {
        prods.push(prod_id);
        context.dispatch({ type: 'SET_SELECTED_PRODUCTS', products: prods });
        handleTotal(prods);
        return;
      }
    }
    prods = context.state.selectedProducts.filter((product: number) => product !== prod_id);
    context.dispatch({ type: 'SET_SELECTED_PRODUCTS', products: prods });
    
    if (context.state.selectedProducts.length === 0) {
      context.dispatch({ type: 'SET_TOTAL', total: 0});
      return;
    }
    handleTotal(prods);
  };

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    status.dispatch({ type: 'TOGGLE_LOADING' });
  };

  function handleTotal(prods: Array<number>): void {
    let buffer: number = 0;
    prods.map((prod: number) => {
      products.map((product: Product) => {
        if (product.meta.id === prod) {
          buffer = buffer + product.details.price;
        }
      });
    });
    context.dispatch({ type: 'SET_TOTAL', total: buffer});
  };

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
          <Heading 
            type="sub" 
            styles={styles}
            body={
              <div className={styles.toggleBox}>
                <Toggle onChange={handlePaymentType} classes={styles.toggle}/>
              </div>}>
            {context.state.paymentType === "once"
             ? "ONE-TIME"
             : "MONTHLY"}
          </Heading>
          <form className={`${styles.form} relative`} onSubmit={handleSubmit}>
            <Grid even grid={styles.grid}>
              {cards.map((card: ProductCardType, index: number) => (
                <div className={styles.cardBox} key={index}>
                  <label htmlFor={`card-${index+1}`}>
                    <ProductCard 
                      fill
                      priority
                      styles={productStyles} 
                      card={card}
                      paymentType={context.state.paymentType}
                    />
                  </label>
                  <input 
                    type="checkbox" 
                    id={`card-${index+1}`} 
                    name={`card-${index+1}`} 
                    value={card.id}
                    onChange={handleSelected}
                  />
                </div>))}
            </Grid>
            <p>{`TOTAL: $${context.state.paymentType === "once"
                           ? context.state.total
                           : ((context.state.total + (context.state.total * .15)) / 12).toFixed(2) + '/month'}`}
              {context.state.paymentType === "monthly"
               ? <span>* For 12 months</span>
               : <span>&nbsp;</span>}
            </p>
            <input 
              type="submit" 
              className={'btn-activeFocus btn-hoverConfig'}
            />
          </form>
        </Container>
        <PaymentForm />
      </Container>
    </Layout>
  );
};

export default Index;
