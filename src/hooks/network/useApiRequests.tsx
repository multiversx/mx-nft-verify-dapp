import axios from 'axios';
import { GetAccountNfts, GetCollectionNfts } from 'types';
import { asyncWrapper } from 'utils';
import { useAxiosAuthWrapper } from './useAxiosAuthWrapper';

export const useApiRequests = () => {
  const axiosAuthWrapper = useAxiosAuthWrapper();

  const DEFAULT_TIMEOUT = 3000;

  return {
    getAccountNfts: ({
      apiAddress,
      accountAddress,
      collections
    }: GetAccountNfts) =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${apiAddress}/accounts/${accountAddress}/nfts`, {
            timeout: DEFAULT_TIMEOUT,
            params: {
              collections: collections.join(',')
            }
          })
        )
      ),

    getCollectionNfts: ({ apiAddress, collection }: GetCollectionNfts) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/collections/${collection}/nfts`, {
          timeout: DEFAULT_TIMEOUT
        })
      ),
    callbackUrlAfterValidate: ({
      callbackUrl,
      address
    }: {
      callbackUrl: string;
      address: string;
    }) =>
      axios.get(callbackUrl, {
        params: {
          address
        },
        timeout: DEFAULT_TIMEOUT
      }),

    getTransactionsCount: ({
      apiAddress,
      receiverAddress,
      collectionId,
      beforeTimestamp
    }: {
      apiAddress: string;
      receiverAddress: string;
      collectionId: string;
      beforeTimestamp: number;
    }) =>
      axiosAuthWrapper().then((authAxios) =>
        asyncWrapper(() =>
          authAxios.get(`${apiAddress}/transactions/count`, {
            params: {
              receiver: receiverAddress,
              token: collectionId,
              before: beforeTimestamp
            },
            timeout: DEFAULT_TIMEOUT
          })
        )
      )
  };
};
