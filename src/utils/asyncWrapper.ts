import { AxiosResponse } from 'axios';

export const asyncWrapper = async <T>(
  asyncRequest: () => Promise<AxiosResponse<T>>
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
      success: false,
      data: null
    };
  }
};
