import { FC } from 'react';
import UserContextProvider from 'src/store/provider/UserContextProvider';
import CombinedComponents from 'src/utils/combineComponents';

const providers:FC[] = [UserContextProvider];

export default function RootContextProvider() {
  return CombinedComponents(providers);
}
