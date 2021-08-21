
import React from 'react';
import { ContextProps, DemoContext, PaymentType } from '../utils/types/custom/types';


type DemoActions =
| { type: 'RESET_CONTEXT' }
| { type: 'SET_PAYMENT_TYPE', payment: PaymentType }
| { type: 'SET_SELECTED_PRODUCTS', products: Array<number>}
| { type: 'SET_TOTAL', total: number };

const initialState: DemoContext = {
  paymentType: "once",
  selectedProducts: [],
  total: 0,
};

function reducer(state: DemoContext, action: DemoActions): DemoContext {
  switch(action.type) {
    case 'RESET_CONTEXT':
      return initialState;
    case 'SET_PAYMENT_TYPE':
      return {...state, paymentType: action.payment }
    case 'SET_SELECTED_PRODUCTS':
      return {...state, selectedProducts: action.products}
    case 'SET_TOTAL':
      return {...state, total: action.total}
    default:
      return state;
  };
};
        
export const Context = React.createContext({} as ContextProps<DemoContext, DemoActions>);

const DemoContextProvider: React.FunctionComponent = ({ children }): JSX.Element => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const contextValue = React.useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default DemoContextProvider;
