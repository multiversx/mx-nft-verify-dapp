import axios from 'axios';
import { GetAccountNfts, GetCollectionNfts } from 'types';
import { asyncWrapper } from 'utils';

export const useApiRequests = () => {
  const DEFAULT_TIMEOUT = 3000;

  return {
    getAccountNfts: ({
      apiAddress,
      accountAddress,
      collections
    }: GetAccountNfts) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/accounts/${accountAddress}/nfts`, {
          timeout: DEFAULT_TIMEOUT,
          params: {
            collections: collections.join(',')
          }
        })
      ),

    getCollectionNfts: ({ apiAddress, collection }: GetCollectionNfts) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/collections/${collection}/nfts`, {
          timeout: DEFAULT_TIMEOUT
        })
      ),
    callPixelAfterValidate: ({
      pixel,
      address,
      callback,
      nativeAuthToken,
      identifier,
      ref
    }: {
      pixel: string;
      address: string;
      identifier: string;
      nativeAuthToken: string;
      callback?: string;
      ref?: string;
    }) =>
      axios.get(pixel, {
        params: {
          address,
          callback,
          nativeAuthToken,
          identifier,
          ref
        },
        timeout: DEFAULT_TIMEOUT
      }),

    getTransactionsCount: ({
      apiAddress,
      receiverAddress,
      collection,
      afterTimestamp
    }: {
      apiAddress: string;
      receiverAddress: string;
      collection: string;
      afterTimestamp: number;
    }) =>
      asyncWrapper(() =>
        axios.get(`${apiAddress}/transactions/count`, {
          params: {
            receiver: receiverAddress,
            token: collection,
            after: afterTimestamp
          },
          timeout: DEFAULT_TIMEOUT
        })
      ),
    getParticipantName: ({ accountAddress }: { accountAddress: string }) =>
      asyncWrapper(() =>
        axios.get('https://7a6e-82-79-237-138.ngrok-free.app/xday/tickets', {
          params: {
            address: accountAddress
          },
          timeout: DEFAULT_TIMEOUT
        })
      )
  };
};
