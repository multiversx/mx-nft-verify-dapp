export const queryParamsParser: (params: string) => Map<string, string> | null =
  (params: string) => {
    if (!params?.length) {
      return null;
    }

    const queryParamsMap: Map<string, string> = new Map();

    params.split('&').forEach((param: string, index: number) => {
      const keyValues: string[] = param.split('=');
      const key: string =
        index > 0 ? keyValues[0] : keyValues[0].replace('?', '');
      const value: string | number = keyValues[1];

      queryParamsMap.set(key, value);
    });

    return queryParamsMap;
  };
