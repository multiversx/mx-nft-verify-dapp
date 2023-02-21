import React, { useState, useEffect } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApiRequests } from 'hooks/network';
import { routeNames } from 'routes';
import { TransactionType } from 'types';
import { VerificationState } from './interfaces';

const Verification = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getBlocks } = useApiRequests();

  const { search } = useLocation();

  const navigate = useNavigate();

  const [state, setState] = useState<VerificationState>(
    new VerificationState()
  );

  const callbackRoute = `${routeNames.home}${search}}`;
  const logoutRoute = `${routeNames.verify}${search}}`;

  const onLoginRedirect = () => {
    navigate(callbackRoute, { replace: true });
  };

  const loginParams = {
    callbackRoute,
    logoutRoute,
    onLoginRedirect,
    redirectAfterLogin: false,
    shouldRenderDefaultCss: false,
    nativeAuth: true,
    className: 'button-verify',
    hideButtonWhenModalOpens: true,
    lead: 'Two transactions will be required',
    loginButtonText: 'Verify',
    title: 'Scan the QR using xPortal',
    token: state.blockHash,
    wrapContentInsideModal: false
  };

  const getRef = async (e: HTMLDivElement) => {
    if (!e) {
      return;
    }

    const buttonRef = e.querySelector('button');

    if (buttonRef) {
      await setTimeout(() => {
        buttonRef.click();
      }, 0.01);
    }

    return e;
  };

  const getLastBlock = async () => {
    const result = await getBlocks({
      apiAddress,
      size: 1
    });

    if (result.success && result.data.length) {
      const lastBlock: TransactionType = result.data[0];

      setState({
        ...state,
        blockHash: lastBlock.hash
      });
    }
  };

  useEffect(() => {
    if (!state.blockHash) {
      (async () => {
        await getLastBlock();
      })();
    }
  }, [state.blockHash]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getLastBlock();
    }, state.refreshRate);

    return () => {
      clearInterval(interval);
    };
  }, [state.blockHash]);

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div ref={getRef} className='card-body text-center'>
        <WalletConnectLoginButton {...loginParams} />
      </div>
    </div>
  );
};

export default Verification;
