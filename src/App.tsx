import React from 'react';

import {
  DappProvider,
  AxiosInterceptorContext
} from '@multiversx/sdk-dapp/wrappers';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { dappEnvironment } from 'config';
import { walletConnectV2ProjectId, apiTimeout } from 'config';
import { PageNotFound } from 'pages/PageNotFound';
import routes from 'routes';

const App = () => {
  return (
    <AxiosInterceptorContext.Provider>
      <DappProvider
        environment={dappEnvironment}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout,
          walletConnectV2ProjectId
        }}
      >
        <Layout>
          <AxiosInterceptorContext.Listener />
          <Routes>
            {routes.map((route, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </DappProvider>
    </AxiosInterceptorContext.Provider>
  );
};

const RoutedApp = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  );
};

export default RoutedApp;
