
import React from 'react';
import { Combinable } from '../../utils/types/custom/types';
import { preg_match } from '../functions';
import { abrvStates, fullStates } from './states';


function useValidation() {
  const [ isValidated, setValidated ] = React.useState<boolean>(false);
  const [ error, setError ] = React.useState<string>('');

  function address(field: string): string {
    if (field.length === 0) return 'No address entered.\n';

    const arr: Array<string> = field.split(' ');
    const test: number | null = parseInt(arr[0]);

    if (test) {
      return '';
    }

    return 'Please enter a valid address format. (i.e. 12345 Main St.)\n';
  };

  function age(field: Combinable): string {
    if (field === '' || field === 0) return 'No Age was entered.\n';
    else if (typeof field === 'string') {
      if (parseInt(field) < 21) {
        return 'You must be at least 18 years of age to create an account.\n';
      }
    }
    else if (field < 21) return 'You must be at least 18 years of age to create an account.\n';

    return '';
  };

  function content(field: string, len: number, name?: string): string {
    if (field === '') { 
      return `No ${name ? name : 'content'} entered.\n`; 
    }
    if (!lenCheck(field, len)) {
    return `${name ? name : 'Content'} must be at least (${len}) characters long.\n`;
    }

    return '';
  };
    
  function email(field: string): string {
    if (field === '') return 'No Email address was entered.\n';
    else if (!(field?.indexOf('.') > 0 || field?.indexOf('@') > 0) && preg_match('[^a-zA-z0-9_-]', field)) 
      return 'The entered email address is invalid.\n';

    return '';
  };

  function firstname(field: string): string {
    return field === '' ? 'No First Name was entered.\n': '';
  };

  function lastname(field: string): string {
    return field === '' ? 'No Last Name was entered.\n': '';
  };

  function lenCheck(field: string, len: number): boolean {
    return field.length > len ? true : false;
  };
    
  function password(field: string): string {
    if (field === '') return 'No Password entered\n';
    else if (field?.length && field.length < 6) return 'Password must be at least 6 characters long.\n';
    else if (!preg_match('[a-z]', field) || !preg_match('[A-Z]', field ) || !preg_match('[0-9]', field)) 
    return 'Passwords require at least (1) uppercase letter, (1) lowercase letter and (1) number.\n';
    
    return '';
  };

  function postalCode(field: number): string {
    if (field === 0 || !field) return 'No Postal Code entered.\n';
    if (field < 10000 || field > 99999) return 'Please enter a valid postal code.\n'
    return '';
  };
    
  function pwCheck(pw: string, pwC: string): boolean {
      return pwC === pw ? true : false;
  };

  function state(state: string): string {
    let fail: string = '';
    const full: Array<string> = fullStates;
    const abvr: Array<string> = abrvStates;
    
    if (!abvr.includes(state.toUpperCase())) {
      if (!full.includes(state.toLowerCase())) {
        fail = 'Please enter a valiid state. (ex: either Oregon or OR)';
      }
    }
    return fail;
  };

  function title(field: string, len: number): string {
    let fail = '';
    if (field === '') { fail = 'No title was entered'; }
    if (!lenCheck(field, len)) { fail = fail + 'Title must be at least (5) characters long.\n'; }
    
    return fail;
  };
    
  function username(field: string): string {
    if (field === '') return 'No Username entered.\n';
    else if (field?.length && field.length < 5) return 'Usename must be at least 5 characters long.\n';
    else if (preg_match('\W', field)) return 'Username must only contain letters, numbers, _ and -.\n';
    
    return '';
  };
    
  function validate(): void {
    setValidated(true);
  };

  return {
    address,
    age,
    content,
    email,
    error,
    firstname,
    lastname,
    password,
    postalCode,
    pwCheck,
    title,
    username,
    setError,
    state,
    validate,
    isValidated
  };
};

export default useValidation;