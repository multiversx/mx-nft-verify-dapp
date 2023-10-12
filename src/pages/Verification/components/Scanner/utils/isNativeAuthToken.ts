import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { NativeAuthServer } from '@multiversx/sdk-native-auth-server';
import type { NativeAuthServerConfig } from '@multiversx/sdk-native-auth-server/lib/src/entities/native.auth.server.config';

export const isNativeAuthToken = (token: string) => {
  const API_URL =
    fallbackNetworkConfigurations[EnvironmentsEnum.mainnet].apiAddress;

  const config: Partial<NativeAuthServerConfig> = {
    apiUrl: API_URL
  };

  try {
    const server = new NativeAuthServer(config);
    const decodedToken = server.decode(token);

    if (!decodedToken) return false;

    return true;
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};
