import React, { useEffect, useState } from 'react';
import { faCheck, faTimes, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@multiversx/sdk-dapp/UI/Loader';
import { PageState } from '@multiversx/sdk-dapp/UI/PageState';
import { useSearchParams } from 'react-router-dom';
import { useApiRequests } from 'hooks/network';
import { useValidateNftFromToken } from 'hooks/nft';
import { QueryParamEnum } from 'pages/Result/result.types';
import { isNativeAuthToken, isNativeAuthTokenValid } from '../utils';

interface ScanResultProps {
  nativeAuthToken: string;
  handleReset: () => void;
}

export const ScanResult = ({
  nativeAuthToken,
  handleReset
}: ScanResultProps) => {
  const { callPixelAfterValidate } = useApiRequests();

  const [searchParams] = useSearchParams();

  const [scanResultMessage, setScanResultMessage] = useState<string>();
  const [isScanResultPositive, setIsScanResultPositive] = useState<boolean>();

  const {
    isValidatedNft,
    isErrorValidateNft,
    nftIdentifier,
    isLoadingValidateNft,
    accountAddress
  } = useValidateNftFromToken(nativeAuthToken);

  const validateNativeAuthToken = async () => {
    if (!isNativeAuthToken(nativeAuthToken)) {
      setIsScanResultPositive(false);
      setScanResultMessage('The provided token is not a NativeAuth token.');
    } else if (!isNativeAuthTokenValid(nativeAuthToken)) {
      setIsScanResultPositive(false);
      setScanResultMessage('NativeAuth token invalid.');
    } else if (!isValidatedNft) {
      setIsScanResultPositive(false);
      setScanResultMessage('Not a valid NFT proof.');
    } else {
      setIsScanResultPositive(true);
      setScanResultMessage('You are in!');
    }
  };

  useEffect(() => {
    validateNativeAuthToken();

    const pixelParam = searchParams.get(QueryParamEnum.pixel);
    const refParam = searchParams.get(QueryParamEnum.ref);

    if (isValidatedNft && pixelParam && nftIdentifier && accountAddress) {
      callPixelAfterValidate({
        pixel: pixelParam,
        address: accountAddress,
        identifier: nftIdentifier,
        nativeAuthToken,
        ...(refParam && { ref: refParam })
      });
    }
  }, [nativeAuthToken, isValidatedNft]);

  const isLoading =
    !scanResultMessage ||
    isScanResultPositive === undefined ||
    isLoadingValidateNft;
  const isError = !scanResultMessage && isErrorValidateNft && !isLoading;
  const isReady = !isLoading && !isError;

  return (
    <div className='scan-result'>
      <div className='card'>
        {isLoading && <Loader noText />}
        {isError && (
          <PageState
            icon={faEraser}
            iconSize='3x'
            title='Oops!'
            description='Unable to scan.'
          />
        )}

        {isReady && (
          <>
            <PageState
              icon={isScanResultPositive ? faCheck : faTimes}
              iconClass={
                isScanResultPositive ? 'icon-positive' : 'icon-negative'
              }
              iconSize='3x'
              title={scanResultMessage}
            />
            <button onClick={handleReset} className='btn btn-primary'>
              Start over
            </button>
          </>
        )}
      </div>
    </div>
  );
};
