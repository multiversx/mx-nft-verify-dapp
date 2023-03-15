import React from 'react';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  return (
    <div className='layout'>
      <Navbar />
      <main className='layout-main'>
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.verify}${search}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
      </main>
      <Footer />
    </div>
  );
};
