
import React from 'react';
import { ContextProps, DemoStatus, ProgressStage } from '../utils/types/custom/types';


type StatusActions = 
| { type: 'TOGGLE_LOADING' }
| { type: 'SET_ERROR', error: string, stage: ProgressStage }
| { type: 'SET_PENDING', stage: ProgressStage }
| { type: 'COMPLETED' };


const initialState: DemoStatus = {
  status: 'pending',
  stage: 'start'
};

function reducer(state: DemoStatus, action: StatusActions): DemoStatus
{
  switch(action.type) {
    case 'TOGGLE_LOADING':
      return {...state, status: 'loading'};
    case 'SET_PENDING':
      return {...state, status: 'pending', stage: action.stage };
    case 'SET_ERROR':
      return {...state, status: 'error', error: action.error, stage: action.stage};
    case 'COMPLETED':
      return {...state, status: 'completed'}
    default:
      return state;
  };
};

export const StatusContext = React.createContext({} as ContextProps<DemoStatus, StatusActions>);

const StatusContextProvider: React.FunctionComponent = ({ children }): JSX.Element => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const contextValue = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusContextProvider;