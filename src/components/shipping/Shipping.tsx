
import React from 'react';

import styles from './Shipping.module.scss';

import { Context } from '../../context/DemoContext';
import { StatusContext } from '../../context/StatusContext';

import Container from '../base/Container';
import Input from '../base/Input';


const ShippingForm: React.FunctionComponent = (): JSX.Element => {
  const context = React.useContext(Context);
  const status = React.useContext(StatusContext);

  function handleShipping(e: React.FormEvent): void {
    e.preventDefault();
    status.dispatch({ type: 'SET_PENDING', stage: 'payment' });
  };

  return (
    <Container type="wrapper" styles={styles} classes={'noselect'}>
      <h1>{'SHIPPING'}</h1>
      <form className={styles.form} onSubmit={handleShipping}>
        <Input
          labelFront={'Address'} 
          placeholder={'Enter address'} 
          styles={styles}
          changed={(e: React.ChangeEvent<HTMLInputElement>) => context.dispatch({ type: 'SET_ADDRESS', address: e.target.value})}/>
        <Input
          labelFront={'City'} 
          placeholder={'Enter city'} 
          styles={styles}
          changed={(e: React.ChangeEvent<HTMLInputElement>) => context.dispatch({ type: 'SET_CITY', city: e.target.value})}/>
        <Input
          labelFront={'Postal Code'} 
          placeholder={'Enter postal code'} 
          styles={styles}
          changed={(e: React.ChangeEvent<HTMLInputElement>) => context.dispatch({ type: 'SET_POSTAL', postal: e.target.value})}/>
        <Input
          labelFront={'State'} 
          placeholder={'Enter state'} 
          styles={styles}
          changed={(e: React.ChangeEvent<HTMLInputElement>) => context.dispatch({ type: 'SET_STATE', state: e.target.value})}/>
        <div className={styles.btnBox}>
          <Input type={'reset'} value={'RESET'} classes={`${styles.btn} btn-activeFocus btn-hoverConfig`}/>
          <Input type={'submit'} value={'SUBMIT'} classes={`${styles.btn} btn-activeFocus btn-hoverConfig`}/>
        </div>
      </form>
      <div className={styles.btnBox}>
        <button className={styles.btn} onClick={() => { status.dispatch({ type: 'SET_PENDING', stage: 'selection' })}}>Back</button>
      </div>
    </Container>
  );
};

export default ShippingForm;
