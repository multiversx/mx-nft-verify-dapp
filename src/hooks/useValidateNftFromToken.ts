import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { useSearchParams } from 'react-router-dom';
import { QueryParamEnum } from 'pages/Result/result.types';
import { decodeNativeAuthToken } from 'pages/Scan/utils';
import { getTimestamp } from 'utils';
import { useApiRequests } from './useApiRequests';

export const useValidateNftFromToken = (nativeAuthToken: string) => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getAccountNfts, getTransactionsCount } = useApiRequests();

  const [searchParams] = useSearchParams();

  const [isLoadingValidateNft, setIsLoadingValidateNft] = useState(false);
  const [isErrorValidateNft, setIsErrorValidateNft] = useState(false);
  const [isValidatedNft, setIsValidatedNft] = useState(false);
  const [accountAddress, setAccountAddress] = useState<string>();
  const [nftIdentifier, setNftIdentifier] = useState<string>();

  const decodedToken = decodeNativeAuthToken(nativeAuthToken);

  const getNftCollection = async () => {
    const nftCollection = searchParams.get(QueryParamEnum.collection);
    const age = searchParams.get(QueryParamEnum.age);

    if (!decodedToken || !nftCollection || !age) {
      return;
    }

    const { address } = decodedToken;

    setAccountAddress(address);
    setIsLoadingValidateNft(true);

    try {
      const { data: availableNfts } = await getAccountNfts({
        apiAddress,
        accountAddress: address,
        collections: [nftCollection]
      });

      for (let i = 0; i < availableNfts.length; i++) {
        const { data: noOfTx } = await getTransactionsCount({
          apiAddress,
          receiverAddress: address,
          collection: availableNfts[i].identifier,
          afterTimestamp: getTimestamp('seconds', Number(age))
        });

        if (noOfTx === 0) {
          setNftIdentifier(availableNfts[i].identifier);
          setIsValidatedNft(true);
          break;
        }
      }
    } catch (error) {
      setIsErrorValidateNft(true);
    }

    setIsLoadingValidateNft(false);
  };

  useEffect(() => {
    getNftCollection();
  }, [nativeAuthToken]);

  return {
    isValidatedNft,
    isErrorValidateNft,
    isLoadingValidateNft,
    nftIdentifier,
    accountAddress
  };
};
