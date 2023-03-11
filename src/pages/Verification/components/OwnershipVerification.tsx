import React, { useEffect, useState } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI';
import { useLocation } from 'react-router-dom';
import { walletConnectV2ProjectId } from 'config';
import { routeNames } from 'routes';

export const OwnershipVerification = () => {
  const { search } = useLocation();
  const isLoggedIn = useGetIsLoggedIn();

  const [toggleRefresh, setToggleRefresh] = useState(false);

  const getRef = async (e: HTMLDivElement) => {
    if (!e) {
      return;
    }

    const buttonRef = e.querySelector('button');

    if (buttonRef) {
      setTimeout(() => {
        buttonRef.click();
      }, 0.01);
    }

    return e;
  };

  useEffect(() => {
    const interval = setInterval(
      () => setToggleRefresh((prevToggleRefresh) => !prevToggleRefresh),
      6000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='verify-ownership card'>
      <h1 className='text-center'>Scan with xPortal</h1>
      <div ref={getRef} className='card-body text-center pb-0 mx-auto'>
        <WalletConnectLoginButton
          callbackRoute={`${routeNames.result}${search}`}
          logoutRoute={routeNames.verify}
          nativeAuth={true}
          hideButtonWhenModalOpens={true}
          wrapContentInsideModal={false}
          {...(walletConnectV2ProjectId && {
            isWalletConnectV2: true
          })}
          {...(!isLoggedIn && { key: toggleRefresh.toString() })}
        />
      </div>
    </div>
  );
};
