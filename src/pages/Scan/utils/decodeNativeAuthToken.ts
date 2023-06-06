import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { NativeAuthServer } from '@multiversx/sdk-native-auth-server';
import { NativeAuthServerConfig } from '@multiversx/sdk-native-auth-server/lib/src/entities/native.auth.server.config';

export const decodeNativeAuthToken = (nativeAuthToken: string) => {
  const API_URL =
    fallbackNetworkConfigurations[EnvironmentsEnum.mainnet].apiAddress;

  const config: Partial<NativeAuthServerConfig> = {
    apiUrl: API_URL
  };

  try {
    const server = new NativeAuthServer(config);
    const decodedToken = server.decode(nativeAuthToken);

    return decodedToken;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};
