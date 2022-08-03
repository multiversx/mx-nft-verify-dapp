import axios from 'axios';
import { TransactionType } from 'pages/Home/interfaces';

interface GetBlocks {
  apiAddress: string;
  size: number;
  timeout: number;
  url?: string;
}

interface FetchResult {
  data: TransactionType[];
  success: boolean;
}

const fetchBlocks = (url: string) =>
  async function getBlocks({
    apiAddress,
    size,
    timeout
  }: GetBlocks): Promise<FetchResult> {
    try {
      const { data } = await axios.get(`${apiAddress}${url}`, {
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

export const getBlocks = fetchBlocks('/blocks');
