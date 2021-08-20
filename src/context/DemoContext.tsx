
import React from 'react';
import { ContextProps, Demo, PaymentType } from '../utils/types/custom/types';


type DemoActions =
| { type: 'SET_PAYMENT_TYPE', payment: PaymentType }
| { type: 'SET_SELECTED_PRODUCTS', products: Array<number>}
| { type: 'SET_TOTAL', total: number };

const initialState: Demo = {
  paymentType: "once",
  selectedProducts: [],
  total: 0,
};

function reducer(state: Demo, action: DemoActions): Demo {
  switch(action.type) {
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
        
export const DemoContext = React.createContext({} as ContextProps<Demo, DemoActions>);

const DemoContextProvider: React.FunctionComponent = ({ children }): JSX.Element => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const contextValue = React.useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]);

  return (
    <DemoContext.Provider value={contextValue}>
      {children}
    </DemoContext.Provider>
  );
};

export default DemoContextProvider;
