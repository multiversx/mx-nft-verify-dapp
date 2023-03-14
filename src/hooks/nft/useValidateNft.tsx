import { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { useSearchParams } from 'react-router-dom';
import { useApiRequests } from 'hooks/network';
import { QueryParamEnum } from 'pages/Result/result.types';
import { getTimestamp } from 'utils';

export const useValidateNft = () => {
  const account = useGetAccountInfo();

  const { address: accountAddress } = account;

  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getAccountNfts, getTransactionsCount } = useApiRequests();

  const [isLoadingValidateNft, setIsLoadingValidateNft] = useState(false);
  const [isValidatedNft, setIsValidatedNft] = useState(false);

  const [searchParams] = useSearchParams();

  const getNftCollection = async () => {
    const nftCollection = searchParams.get(QueryParamEnum.collection);
    const age = searchParams.get(QueryParamEnum.age);

    if (!nftCollection || !age) {
      return;
    }

    setIsLoadingValidateNft(true);

    const { data: availableNfts } = await getAccountNfts({
      apiAddress,
      accountAddress,
      collections: [nftCollection]
    });

    for (let i = 0; i < availableNfts.length; i++) {
      const { data: noOfTx } = await getTransactionsCount({
        apiAddress,
        receiverAddress: accountAddress,
        collection: availableNfts[i].identifier,
        afterTimestamp: getTimestamp('seconds', Number(age))
      });

      if (noOfTx === 0) {
        setIsValidatedNft(true);
        break;
      }
    }

    setIsLoadingValidateNft(false);
  };

  useEffect(() => {
    getNftCollection();
  }, []);

  return {
    isValidatedNft,
    isLoadingValidateNft
  };
};
