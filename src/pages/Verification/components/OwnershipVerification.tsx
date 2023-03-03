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
    <div className='card shadow-sm rounded p-4 border-0'>
      <div ref={getRef} className='card-body text-center'>
        <WalletConnectLoginButton
          callbackRoute={routeNames.result}
          logoutRoute={routeNames.verify}
          nativeAuth={true}
          className='button-verify'
          hideButtonWhenModalOpens={true}
          loginButtonText={'Verify'}
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
