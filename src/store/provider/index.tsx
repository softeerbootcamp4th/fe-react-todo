import { FC, ReactNode } from 'react';
import TodoContextProvider from 'src/store/provider/TodoContextProvider';
import UserContextProvider from 'src/store/provider/UserContextProvider';
import CombinedComponents from 'src/utils/combineComponents';

type FCWithChildren = FC<{ children: ReactNode }>;

const providers: FCWithChildren[] = [UserContextProvider, TodoContextProvider];

const RootContextProvider: FCWithChildren = CombinedComponents(providers);

export default RootContextProvider;
