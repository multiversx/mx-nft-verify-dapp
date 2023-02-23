import React, { useState, useEffect } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI';
import { useNavigate } from 'react-router-dom';
import { useApiRequests } from 'hooks/network';
import { OwnershipVerificationState } from 'pages/Verification/verification.types';
import { routeNames } from 'routes';
import { TransactionType } from 'types';

export const OwnershipVerification = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getBlocks } = useApiRequests();

  const navigate = useNavigate();

  const [verificationParams, setVerificationParams] = useState(
    new OwnershipVerificationState()
  );

  const callbackRoute = `${routeNames.home}?collection=MOS-b9b4b2`;
  const logoutRoute = `${routeNames.verify}`;

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
    token: verificationParams.blockHash,
    wrapContentInsideModal: false
  };

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

  const getLastBlock = async () => {
    const result = await getBlocks({
      apiAddress,
      size: 1
    });

    if (result.success && result.data.length) {
      const lastBlock: TransactionType = result.data[0];

      setVerificationParams({
        ...verificationParams,
        blockHash: lastBlock.hash
      });
    }
  };

  useEffect(() => {
    if (!verificationParams.blockHash) {
      (async () => {
        await getLastBlock();
      })();
    }
  }, [verificationParams.blockHash]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getLastBlock();
    }, verificationParams.refreshRate);

    return () => {
      clearInterval(interval);
    };
  }, [verificationParams.blockHash]);

  return (
    <div className='card shadow-sm rounded p-4 border-0'>
      <div ref={getRef} className='card-body text-center'>
        <WalletConnectLoginButton {...loginParams} />
      </div>
    </div>
  );
};
