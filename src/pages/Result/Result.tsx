import React, { useEffect } from 'react';
import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { Loader } from '@multiversx/sdk-dapp/UI/Loader';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApiRequests, useValidateNft, useUpdateSearchParams } from 'hooks';
import { routeNames } from 'routes';
import { ResultMessage } from './components';
import { QueryParamEnum } from './result.types';

export const Result = () => {
  const account = useGetAccountInfo();
  const loginInfo = useGetLoginInfo();

  const { address: accountAddress } = account;
  const { tokenLogin } = loginInfo;

  const { callPixelAfterValidate } = useApiRequests();

  const { isValidatedNft, isLoadingValidateNft, nftIdentifier } =
    useValidateNft();
  const { search } = useLocation();
  const navigate = useNavigate();

  const { searchParams, updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    updateSearchParams();

    if (!searchParams.get(QueryParamEnum.collection)) {
      navigate(routeNames.home);
    }

    const pixelParam = searchParams.get(QueryParamEnum.pixel);
    const callbackParam = searchParams.get(QueryParamEnum.callback);
    const refParam = searchParams.get(QueryParamEnum.ref);

    const nativeAuthToken = tokenLogin?.nativeAuthToken ?? '';

    if (pixelParam && nftIdentifier && isValidatedNft) {
      callPixelAfterValidate({
        pixel: pixelParam,
        address: accountAddress,
        identifier: nftIdentifier,
        nativeAuthToken,
        ...(refParam && { ref: refParam })
      });
    }

    // If NFT is validated and a callback was provided, redirect to callback
    if (callbackParam && nftIdentifier && isValidatedNft) {
      setTimeout(() => {
        const callbackUrl = new URL(callbackParam);
        const callbackParams = new URLSearchParams(callbackUrl.search);

        callbackParams.append('identifier', nftIdentifier);
        callbackParams.append('address', accountAddress);
        nativeAuthToken &&
          callbackParams.append('nativeAuthToken', nativeAuthToken);
        refParam && callbackParams.append('ref', refParam);

        callbackUrl.search = callbackParams.toString();
        window.location.href = callbackUrl.toString();
      }, 2000);
    }
  }, [isValidatedNft]);

  const handleLogout = () => {
    logout(`${location.origin}${routeNames.verify}${search}`);
  };

  if (isLoadingValidateNft) {
    return <Loader noText />;
  }

  return (
    <div className='result-page'>
      <ResultMessage
        isValidated={isValidatedNft}
        handleReset={handleLogout}
        accountAddress={accountAddress}
      />
    </div>
  );
};
