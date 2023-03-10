import React from 'react';
import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI';
import { walletConnectV2ProjectId } from 'config';
import { routeNames } from 'routes';

export const OwnershipVerification = () => {
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

  return (
    <div className='verify-ownership card'>
      <h1 className='text-center'>Scan with xPortal</h1>
      <div ref={getRef} className='card-body text-center pb-0 mx-auto'>
        <WalletConnectLoginButton
          callbackRoute={routeNames.result}
          logoutRoute={routeNames.verify}
          nativeAuth={true}
          hideButtonWhenModalOpens={true}
          wrapContentInsideModal={false}
          {...(walletConnectV2ProjectId
            ? {
                isWalletConnectV2: true
              }
            : {})}
        />
      </div>
    </div>
  );
};
