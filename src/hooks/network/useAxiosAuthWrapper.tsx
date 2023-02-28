import { logout } from '@multiversx/sdk-dapp/utils';
import { useAxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import defaultAxios, { AxiosError, AxiosRequestConfig } from 'axios';
import { routeNames } from 'routes';

const isTest = process.env.NODE_ENV === 'test';

export const useAxiosAuthWrapper = () => {
  const { loginInfo } = useAxiosInterceptorContext();

  const axiosAuthWrapper = async () => {
    if (isTest) {
      return defaultAxios;
    }

    const authInstance = defaultAxios.create();

    authInstance.interceptors.response.use(
      (response) => response,
      defaultAuthInterceptorErrorHandler
    );

    try {
      const bearerToken = loginInfo?.tokenLogin?.nativeAuthToken;
      const interceptor = getAccestTokenInterceptor(bearerToken);
      authInstance.interceptors.request.use(interceptor);
    } catch (error) {
      console.error(error);
    }

    return authInstance;
  };

  const defaultAuthInterceptorErrorHandler = (error: AxiosError) => {
    if (error.response?.status === 403 || error.response?.status === 404) {
      console.log('Axios request 403. Logging out.');
      logout(`${window.location.origin}${routeNames.home}`);
    }

    return Promise.reject(error);
  };

  const getAccestTokenInterceptor =
    (bearerToken?: string) => (config: AxiosRequestConfig) => {
      if (!config?.headers) {
        return config;
      }

      config.headers.Authorization = bearerToken ? `Bearer ${bearerToken}` : '';

      return config;
    };

  return axiosAuthWrapper;
};
