
import React from 'react';
import Heading from '../../../../../components/base/Heading';
import { StatusContext } from '../../../../../context/StatusContext';

import styles from './Intro.module.scss';


const Intro: React.FunctionComponent = (): JSX.Element => {
  const status = React.useContext(StatusContext);

  function startDemo(): void {
    status.dispatch({ type: 'SET_PENDING', stage: 'selection' });
  };

  return (
    <Heading 
      type="main" 
      styles={styles}
      body={
        <div className={styles.headingBtnBox}>
          <button 
            className={styles.headingBtn} 
            onClick={startDemo}>
              {'Start'}
          </button>
        </div>
      }>
      <span>{'Stripe/Next.js'}</span>
      <span>{'Integration Demo'}</span>
    </Heading>
  );
};

export default Intro;