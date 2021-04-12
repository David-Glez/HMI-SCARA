import React, {createContext, useContext, useReduce} from 'react';
import {initialState, SCARAReducer} from './reducer'

const SCARAStateContext = createContext();
const SCARADispatchContext = createContext();

//  customs hooks to use context
const useSCARAState = () => {
    const context = useContext(SCARAStateContext);
    if(context === undefined){
        throw new Error("useSCARAState must be used within a SCARAProvider");
    }

    return context;
}

const useSCARADispatch = () => {
    const context = useContext(SCARADispatchContext);
    if(context === undefined){
        throw new Error("useSCARADispatch must be used whitin a SCARAProvider");
    }
    return context;
}

const SCARAProvider = ({children}) => {
    const [settings, dispatch] = useReducer(SCARAReducer, initialState);
    return (
        <ScaraStateContext.Provider value={settings}>
            <ScaraDispatchContext.Provider value={dispatch}>
                {children}
            </ScaraDispatchContext.Provider>
        </ScaraStateContext.Provider>
    );
}

export {
    useSCARAState,
    useSCARADispatch,
    SCARAProvider
}