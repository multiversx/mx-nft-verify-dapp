import axios from 'axios';

import { DEFAULT_TIMEOUT } from 'appConstants';

import {
  GetBlocks,
  FetchResult,
  TransactionType,
  GetAccountNfts,
  Nft,
  Transaction,
  GetTransactions,
  GetCollectionNfts
} from 'model';

export const getBlocks = async ({
  apiAddress,
  size
}: GetBlocks): Promise<FetchResult<TransactionType>> => {
  try {
    const { data } = await axios.get(`${apiAddress}/blocks`, {
      params: {
        size
      },
      timeout: DEFAULT_TIMEOUT
    });

    return {
      data: data,
      success: data !== undefined
    };
  } catch (err) {
    return {
      data: [],
      success: false
    };
  }
};

export const getAccountNfts = async ({
  apiAddress,
  accountAddress,
  collections
}: GetAccountNfts): Promise<FetchResult<Nft>> => {
  try {
    const { data } = await axios.get(
      `${apiAddress}/accounts/${accountAddress}/nfts`,
      {
        timeout: DEFAULT_TIMEOUT,
        params: {
          collections: collections.join(',')
        }
      }
    );

    return {
      data: data,
      success: data !== undefined
    };
  } catch (err) {
    return {
      data: [],
      success: false
    };
  }
};

export const getCollectionNfts = async ({
  apiAddress,
  collection
}: GetCollectionNfts): Promise<FetchResult<Nft>> => {
  try {
    const { data } = await axios.get(
      `${apiAddress}/collections/${collection}/nfts`,
      {
        timeout: DEFAULT_TIMEOUT
      }
    );

    return {
      data: data,
      success: data !== undefined
    };
  } catch (err) {
    return {
      data: [],
      success: false
    };
  }
};

export const getAccountTransfers = async ({
  apiAddress,
  accountAddress,
  token,
  before,
  after
}: GetTransactions): Promise<FetchResult<Transaction>> => {
  try {
    const { data } = await axios.get(
      `${apiAddress}/accounts/${accountAddress}/transfers`,
      {
        params: {
          receiver: accountAddress,
          before,
          after,
          token
        },
        timeout: DEFAULT_TIMEOUT
      }
    );

    return {
      data: data,
      success: data !== undefined
    };
  } catch (err) {
    return {
      data: [],
      success: false
    };
  }
};
