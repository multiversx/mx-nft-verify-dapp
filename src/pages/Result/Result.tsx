import React, { useEffect } from 'react';
import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { Loader } from '@multiversx/sdk-dapp/UI/Loader';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { collection, pixel, callback, age, ref } from 'config';
import { useApiRequests } from 'hooks/network';
import { useValidateNft } from 'hooks/nft';
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

  const [searchParams, setSearchParams] = useSearchParams();

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

  // If the params are set in the conifg, we update the searchParams with those, otherwise those built in the Build URL form will remain
  const updateSearchParams = () => {
    if (collection) {
      searchParams.set(QueryParamEnum.collection, collection);
    }

    if (pixel) {
      searchParams.set(QueryParamEnum.pixel, pixel);
    }

    if (callback) {
      searchParams.set(QueryParamEnum.callback, callback);
    }

    if (age) {
      searchParams.set(QueryParamEnum.age, age);
    }

    if (ref) {
      searchParams.set(QueryParamEnum.ref, ref);
    }

    setSearchParams(searchParams);
  };

  if (isLoadingValidateNft) {
    return <Loader noText />;
  }

  return (
    <div className='result-page'>
      <ResultMessage isValidated={isValidatedNft} handleReset={handleLogout} />
    </div>
  );
};
