import axios from 'axios';
import { TransactionType } from 'pages/Home/interfaces';

export interface GetBlocks {
  apiAddress: string;
  size: number;
  timeout: number;
  url?: string;
}

export interface FetchResult {
  data: TransactionType[];
  success: boolean;
}

export const getBlocks = async ({
  apiAddress,
  size,
  timeout
}: GetBlocks): Promise<FetchResult> => {
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
