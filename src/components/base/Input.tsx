
import React from 'react';
import { BaseOptions } from '../../utils/types/custom/types';


type Props = {
  col?: boolean;
  classes?: string;
  toggle?: boolean;
  placeholder?: string;
  autoComplete?: boolean;
  label?: string | JSX.Element | HTMLElement;
  labelFront?: string | JSX.Element | HTMLElement;
  labelBack?: string | JSX.Element | HTMLElement;
  labelClasses?: string;
  type?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
} & BaseOptions;

const Input: React.FunctionComponent<Props> = (
  { 
    parent,
    col,
    toggle,
    value,
    type,
    label,
    labelFront,
    labelBack,
    labelClasses,
    placeholder,
    autoComplete,
    changed,
    styles,
    classes,
    clicked
  }
): JSX.Element => {
  return (
      toggle ? 
      <React.Fragment>
        <input 
          className={`${ styles && styles.checkbox } ${ classes ? classes : '' }`} 
          id={`${ parent }__toggle`} 
          type="checkbox"
          value={ value } 
          onChange={ clicked } />
        <label className={`${ styles && styles.checkboxBtn }`} htmlFor={`${ parent }__toggle`}>
          <span className={`${ styles && styles.checkboxBtnIcon }`}>{ label || ''}</span>
        </label> 
      </React.Fragment>
      : 
      <React.Fragment>
        {
          labelFront && 
          <label className={`${ styles && styles.labelFront || '' } ${ labelClasses ? labelClasses : '' }`} htmlFor={`${ parent ? parent + '__input' : ''}`}
          >
            { labelFront }
          </label>
        }
        { col ? <br></br> : '' }
        <input 
          className={`${ styles && styles.input || '' } ${ classes ? classes : '' }`} 
          id={`${ parent ? parent + '__input' : ''}`} 
          type={ type ? type : "text" } 
          autoComplete={ autoComplete ? "on" : "off" }
          placeholder={ placeholder ? placeholder : '' }
          value={ value }
          onClick={ clicked }
          onChange={ changed }
        />
        { col ? <br></br> : ''}
        {
          labelBack && 
          <label className={`${ styles && styles.labelBack || '' } ${ labelClasses ? labelClasses : '' }`} htmlFor={`${ parent ? parent + '__input' : ''}`}
          >
            { labelBack }
          </label>
        }
      </React.Fragment>
  )
};

export default Input;
