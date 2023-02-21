import { useAxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import defaultAxios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig
} from 'axios';
// import {
//   getImpersonatedCookieAddress,
//   impersonateCookieName
// } from 'components/Impersonate';
// import { logoutFromApp } from 'utils';

const isTest = process.env.NODE_ENV === 'test';

export const useAxiosAuthWrapper = () => {
  const { loginInfo } = useAxiosInterceptorContext();

  const axiosAuthWrapper = async (): Promise<AxiosInstance> => {
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

  // const impersonatedAddress = getImpersonatedCookieAddress();

  const defaultAuthInterceptorErrorHandler = (error: AxiosError) => {
    if (error.response?.status === 403) {
      console.log('Axios request 403. Logging out.');
      // logoutFromApp();
    }

    return Promise.reject(error);
  };

  const getAccestTokenInterceptor =
    (bearerToken?: string) => (config: AxiosRequestConfig) => {
      if (!config?.headers) {
        return config;
      }

      config.headers.Authorization = bearerToken ? `Bearer ${bearerToken}` : '';

      // if (impersonatedAddress) {
      //   config.headers[impersonateCookieName] = impersonatedAddress;
      // }

      return config;
    };

  return axiosAuthWrapper;
};
