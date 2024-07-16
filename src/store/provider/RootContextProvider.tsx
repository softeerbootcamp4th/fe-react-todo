import { ReactNode, useReducer } from "react";
import { RootContext, rootInitialState } from "../context/RootContext";
import rootReducer from "../reducer/rootReducer";

interface RootContextProviderProps {
    children: ReactNode
}

const RootContextProvider = ({children}: RootContextProviderProps) => {
    const [ state, dispatch ] = useReducer(rootReducer,rootInitialState);
    return (
        <RootContext.Provider  value={{state,dispatch}} >
            {children}
        </RootContext.Provider>
    );
}

export default RootContextProvider;