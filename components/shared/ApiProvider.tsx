import * as React from 'react';
import { Store } from 'redux';
import { ReactNode } from 'react';
import { setLoading } from '../../data/store/actions';

export interface ApiContextValue {
  request<T>(req: Function, ...args: any): Promise<T>;
  store: Store;
}

export const ApiContext = React.createContext<null | ApiContextValue>(null);

export const ApiProvider = ({ store, children }: { store: Store; children: ReactNode; }) => {
  const request = (userRequest: Function, ...args: any): Promise<any> => {
    store.dispatch(setLoading(true));
    return userRequest(...args)
      .then((ret: any) => {
        store.dispatch(setLoading(false));
        return ret;
      })
      .catch((err: any) => {
        store.dispatch(setLoading(false));
        return err;
      })
  };

  return (
    <ApiContext.Provider value={{ request, store }}>
      {children}
    </ApiContext.Provider>
  )
};
export function useApi(): ApiContextValue {
  const context = React.useContext<ApiContextValue | null>(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider')
  }
  return context as ApiContextValue;
}