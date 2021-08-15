
import React from 'react';

import baseStyles from './Grid.module.scss';


type Props = {
  grid: any;
  even?: boolean;
  oneXtwo?: boolean;
  twoXone?: boolean;
  blockOne?: JSX.Element | HTMLElement;
  blockTwo?: JSX.Element | HTMLElement;
  blockThree?: JSX.Element | HTMLElement;
  styles?: any;
};


const Grid: React.FunctionComponent<Props> = (
  {
    even,
    oneXtwo,
    twoXone,
    blockOne,
    blockTwo,
    blockThree,
    styles,
    grid,
    children
  }
): JSX.Element => {
  return (
    <React.Fragment>
    {
      oneXtwo ? 
      <div className={`${ baseStyles.oneXtwoCol } ${ grid } relative`}>          
        <div className={`${ styles ? styles.block ? styles.block : styles.blockOne : '' } relative`}>{ blockOne }</div>
        <div>
          <div className={`${ styles ? styles.block ? styles.block : styles.blockTwo : '' } relative`}>{ blockTwo }</div>
          <div className={`${ styles ? styles.block ? styles.block : styles.blockThree : '' } relative`}>{ blockThree }</div>
        </div>
      </div>
      :
      twoXone ?
      <div className={`${ baseStyles.twoXoneCol } ${ grid } relative`}>          
        <div className={ baseStyles.twoXoneColAlt }>
          <div className={`${ styles ? styles.block ? styles.block : styles.blockOne : '' } relative`}>{ blockOne }</div>
          <div className={`${ styles ? styles.block ? styles.block : styles.blockTwo : '' } relative`}>{ blockTwo }</div>
        </div>
        <div className={`${ styles ? styles.block ? styles.block : styles.blockThree : '' } relative`}>{ blockThree }</div>
      </div>
      :
      even ?
      <div className={`${ baseStyles.evenCol } ${ grid } relative`}>          
        { children }
      </div>
      : 
      null
    }
    </React.Fragment>
  )
};

export default Grid;
