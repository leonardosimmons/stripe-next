
import React from 'react';
import { Product, ProductCard as ProductCardType } from '../../../../../utils/types/custom/types';

import styles from './Selection.module.scss';
import productStyles from '../../../../../components/card/ProductCard.module.scss';

import { Context } from '../../../../../context/DemoContext';
import { StatusContext } from '../../../../../context/StatusContext';

import Container from '../../../../../components/base/Container';
import Heading from '../../../../../components/base/Heading';
import ProductCard from '../../../../../components/card/ProductCard';
import Grid from '../../../../../components/grid/Grid';
import Toggle from '../../../../../components/toggle/ToggleSwitch';


type Props = {
  cards: Array<ProductCardType>;
  products: Array<Product>;
};


const ProductSelection: React.FunctionComponent<Props> = ({ cards, products }): JSX.Element => {
  const context = React.useContext(Context);
  const status = React.useContext(StatusContext);
  
  function toggleChecked(index: number, checked: boolean): void {
    if (checked) {
      document.querySelector<HTMLInputElement>(`#card-${index+1}`)!.checked = true;
      return;
    }
    document.querySelector<HTMLInputElement>(`#card-${index+1}`)!.checked = false;
  };

  function handlePaymentType(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.checked) {
      context.dispatch({ type: 'SET_PAYMENT_TYPE', payment: "monthly"});
      return;
    }
    context.dispatch({ type: 'SET_PAYMENT_TYPE', payment: "once"});
  };

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
    status.dispatch({ type: 'SET_PENDING', stage: 'shipping' });
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
    <Container type="wrapper" styles={styles}>
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
              <label htmlFor={`card-${index+1}`} onClick={() => toggleChecked(index, card.checked)}>
                <ProductCard 
                  fill
                  priority
                  card={card}
                  styles={productStyles} 
                  paymentType={context.state.paymentType}
                />
              </label>
              <input 
                type="checkbox" 
                value={card.id}
                id={`card-${index+1}`} 
                name={`card-${index+1}`} 
                checked={card.checked}
                onChange={handleSelected}
                onClick={() => card.checked = !card.checked}
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
          className={`${styles.btn} btn-activeFocus btn-hoverConfig`}
        />
      </form>
    </Container>
  );
};

export default ProductSelection;
