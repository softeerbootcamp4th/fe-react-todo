import { createContext } from 'react';
import { userInitialState } from './UserContext';
import { systemInitialState } from './SystemContext';
import { RootContextProps } from '../types/rootTypes';

const rootInitialState = {
    user: userInitialState,
    system: systemInitialState,
};

const RootContext = createContext<RootContextProps>({state: rootInitialState,dispatch: () => null});

export { RootContext, rootInitialState };
