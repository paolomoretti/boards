import * as React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import reducers from '../data/store/reducers';
import '../styles/global.less';
import { ApiProvider } from '../components/shared/ApiProvider';

const store = createStore(
  combineReducers({
    app: reducers,
  }),
  {}
);

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ApiProvider store={store}>
        <Component {...pageProps} />
      </ApiProvider>
    </Provider>
  );
}