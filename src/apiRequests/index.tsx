import axios from 'axios';

import {
  GetBlocks,
  FetchResult,
  TransactionType,
  GetAccountNfts,
  Nft,
  Transaction
} from 'model';

export const DEFAULT_TIMEOUT = 3000;

export const getBlocks = async ({
  apiAddress,
  size,
  timeout
}: GetBlocks): Promise<FetchResult<TransactionType>> => {
  try {
    const { data } = await axios.get(`${apiAddress}/blocks`, {
      params: {
        size
      },
      timeout
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
  timeout
}: GetAccountNfts): Promise<FetchResult<Nft>> => {
  try {
    const { data } = await axios.get(
      `${apiAddress}/accounts/${accountAddress}/nfts`,
      {
        timeout
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

export const getReceivingTransactions = async ({
  apiAddress,
  accountAddress,
  timeout
}: GetAccountNfts): Promise<FetchResult<Transaction>> => {
  try {
    const { data } = await axios.get(
      `${apiAddress}/accounts/${accountAddress}/transactions`,
      {
        params: {
          receiver: accountAddress
        },
        timeout
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
