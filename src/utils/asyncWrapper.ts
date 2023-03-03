import { FetchResult } from 'types';

export const asyncWrapper = async (
  asyncRequest: () => Promise<FetchResult<any>>
) => {
  try {
    const { data } = await asyncRequest();

    return {
      data,
      success: data !== undefined
    };
  } catch (e) {
    console.error(e);
    return {
      success: false
    };
  }
};
