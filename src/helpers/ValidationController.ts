
import { Combinable } from '../utils/types/custom/types';
import { preg_match } from './functions';
import { abrvStates, fullStates } from './hooks/states';


interface ValidationControls {
  readonly isValidated: boolean;
  readonly error: string;
  address(field: string): string;
  age(field: Combinable): string;
  content(field: string, len: number, name?: string): string;
  email(field: string): string;
  firstname(field: string): string;
  lastname(field: string): string;
  lenCheck(field: string, len: number): boolean;
  password(field: string): string;
  postalCode(field: number): string;
  pwCheck(pw: string, pwC: string): boolean;
  title(field: string, len: number): string;
  username(field: string): string;
  validate(): void;
};


class ValidationController implements ValidationControls
{
  private _validated: boolean;
  private _error: string;

  constructor() {
    this._validated = false;
    this._error = '';
  };

  get isValidated() {
    return this._validated;
  };

  get error() {
    return this._error;
  };

  set error(e: string) {
    this._error = e;
  };

  // Functions
  public address(field: string): string {
    if (field.length === 0) return 'No address entered.\n';

    const arr: Array<string> = field.split(' ');
    const test: number | null = parseInt(arr[0]);

    if (test) {
      return '';
    }

    return 'Please enter a valid address format. (i.e. 12345 Main St.)\n';
  };

  public age(field: Combinable): string {
    if (field === '' || field === 0) return 'No Age was entered.\n';
    else if (typeof field === 'string') {
      if (parseInt(field) < 21) {
        return 'You must be at least 18 years of age to create an account.\n';
      }
    }
    else if (field < 21) return 'You must be at least 18 years of age to create an account.\n';

    return '';
  };

  public content(field: string, len: number, name?: string): string {
    if (field === '') { 
      return `No ${name ? name : 'content'} entered.\n`; 
    }
    if (!this.lenCheck(field, len)) {
    return `${name ? name : 'Content'} must be at least (${len}) characters long.\n`;
    }

    return '';
  };
    
  public email(field: string): string {
    if (field === '') return 'No Email address was entered.\n';
    else if (!(field?.indexOf('.') > 0 || field?.indexOf('@') > 0) && preg_match('[^a-zA-z0-9_-]', field)) 
      return 'The entered email address is invalid.\n';

    return '';
  };

  public firstname(field: string): string {
    return field === '' ? 'No First Name was entered.\n': '';
  };

  public lastname(field: string): string {
    return field === '' ? 'No Last Name was entered.\n': '';
  };

  public lenCheck(field: string, len: number): boolean {
    return field.length > len ? true : false;
  };
    
  public password(field: string): string {
    if (field === '') return 'No Password entered\n';
    else if (field?.length && field.length < 6) return 'Password must be at least 6 characters long.\n';
    else if (!preg_match('[a-z]', field) || !preg_match('[A-Z]', field ) || !preg_match('[0-9]', field)) 
    return 'Passwords require at least (1) uppercase letter, (1) lowercase letter and (1) number.\n';
    
    return '';
  };

  public postalCode(field: number): string {
    if (field === 0) return 'No Postal Code entered.\n';
    if (field < 10000 && field > 99999) return 'Please enter a valid postal code.\n'
    return '';
  };
    
  public pwCheck(pw: string, pwC: string): boolean {
      return pwC === pw ? true : false;
  };

  public state(state: string): string {
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

  public title(field: string, len: number): string {
    let fail = '';
    if (field === '') { fail = 'No title was entered'; }
    if (!this.lenCheck(field, len)) { fail = fail + 'Title must be at least (5) characters long.\n'; }
    
    return fail;
  };
    
  public username(field: string): string {
    if (field === '') return 'No Username entered.\n';
    else if (field?.length && field.length < 5) return 'Usename must be at least 5 characters long.\n';
    else if (preg_match('\W', field)) return 'Username must only contain letters, numbers, _ and -.\n';
    
    return '';
  };
    
  public validate(): void {
    this._validated = true;
  };
}

export { ValidationController };
