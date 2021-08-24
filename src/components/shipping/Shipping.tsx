
import React from 'react';

import styles from './Shipping.module.scss';

import { Context } from '../../context/DemoContext';
import { StatusContext } from '../../context/StatusContext';

import Container from '../base/Container';
import Input from '../base/Input';
import useValidation from '../../helpers/hooks/useValidation';


const ShippingForm: React.FunctionComponent = (): JSX.Element => {
  const validate = useValidation();
  const context = React.useContext(Context);
  const status = React.useContext(StatusContext);

  function validateShipping(): void {
    let fail: string = '';
    fail = fail.concat(validate.address(context.state.shipping.address));
    fail = fail.concat(validate.content(context.state.shipping.city, 2, 'city'));
    fail = fail.concat(validate.postalCode(parseInt(context.state.shipping.postal)));
    fail = fail.concat(validate.state(context.state.shipping.state));
    
    if (validate.error) {
      validate.error = '';
    }

    if (fail === '') {
      validate.validate();
      return;
    }
    validate.error = fail;
  };

  function handleShipping(e: React.FormEvent): void {
    e.preventDefault();
    validateShipping();
    
    if (validate.isValidated) {
      status.dispatch({ type: 'SET_PENDING', stage: 'payment' });
      return;
    }
    alert(validate.error);
    return;
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
          <Input type={'reset'} value={'RESET'} classes={`${styles.btn} relative btn-activeFocus btn-hoverConfig`}/>
          <Input type={'submit'} value={'SUBMIT'} classes={`${styles.btn} relative btn-activeFocus btn-hoverConfig`}/>
        </div>
      </form>
      <div className={styles.btnBox}>
        <button 
          className={`${styles.btn} relative btn-activeFocus btn-hoverConfig`} 
          onClick={() => { status.dispatch({ type: 'SET_PENDING', stage: 'selection' })}}>
            {'Back'}
        </button>
      </div>
    </Container>
  );
};

export default ShippingForm;
