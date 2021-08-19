
import React from 'react';

import styles from './ToggleSwitch.module.scss';


type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: any;
};


const Toggle: React.FunctionComponent<Props> = ({ onChange, classes }): JSX.Element => {
  return (
    <label className={styles.toggleWrapper}>
      <input 
        type="checkbox"
        className={styles.toggleCheckbox}
        onChange={onChange}/>
      <span className={`${styles.toggleSwitch} ${classes || ''}`} />
    </label>
  );
};

export default Toggle;
