import axios from 'axios';
export interface TransactionType {
  epoch: number;
  gasConsumed: number;
  gasPenalized: number;
  gasRefunded: number;
  hash: string;
  maxGasLimit: number;
  nonce: number;
  prevHash: string;
  proposer: string;
  pubKeyBitmap: string;
  round: number;
  shard: number;
  size: number;
  sizeTxs: number;
  stateRootHash: string;
  timestamp: number;
  txCount: number;
}

export interface Nft {
  collection: string;
}

export interface GetBlocks {
  apiAddress: string;
  size: number;
  timeout: number;
  url?: string;
}

export interface GetAccountNfts {
  apiAddress: string;
  accountAddress: number;
  timeout: number;
}

export interface FetchResult<T> {
  data: T[];
  success: boolean;
}

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
