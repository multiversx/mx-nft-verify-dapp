import React, { useEffect, useState } from 'react';

import { nativeAuth } from '@multiversx/sdk-dapp/services/nativeAuth';
import {
  WalletConnectLoginButton,
  WalletConnectLoginButtonPropsType
} from '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton';
import { useLocation } from 'react-router-dom';
import { walletConnectV2ProjectId } from 'config';
import { routeNames } from 'routes';

export const OwnershipVerification = () => {
  const { search } = useLocation();
  const [token, setToken] = useState('');

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

  const getToken = async () => {
    const client = nativeAuth();
    const loginToken = await client.initialize();

    setToken(loginToken);
  };

  useEffect(() => {
    getToken();
    const interval = setInterval(() => getToken(), 6000);

    return () => clearInterval(interval);
  }, []);

  const loginProps: WalletConnectLoginButtonPropsType = {
    callbackRoute: `${routeNames.result}${search}`,
    logoutRoute: `${routeNames.verify}${search}`,
    token,
    nativeAuth: true,
    hideButtonWhenModalOpens: true,
    wrapContentInsideModal: false,
    ...(walletConnectV2ProjectId && {
      isWalletConnectV2: true
    })
  };

  if (!token) {
    return null;
  }

  return (
    <div className='verify-ownership card'>
      <h1 className='text-center'>Scan with xPortal</h1>
      <div ref={getRef} className='card-body text-center pb-0 mx-auto'>
        <WalletConnectLoginButton {...loginProps} />
      </div>
    </div>
  );
};
