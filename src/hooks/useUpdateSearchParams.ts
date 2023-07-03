import { useSearchParams } from 'react-router-dom';
import { age, callback, collection, pixel, ref } from 'config';
import { QueryParamEnum } from 'pages/Result/result.types';

export const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // If the params are set in the conifg, we update the searchParams with those, otherwise those built in the Build URL form will remain
  const updateSearchParams = () => {
    if (collection) {
      searchParams.set(QueryParamEnum.collection, collection);
    }

    if (pixel) {
      searchParams.set(QueryParamEnum.pixel, pixel);
    }

    if (callback) {
      searchParams.set(QueryParamEnum.callback, callback);
    }

    if (age) {
      searchParams.set(QueryParamEnum.age, age);
    }

    if (ref) {
      searchParams.set(QueryParamEnum.ref, ref);
    }

    setSearchParams(searchParams);
  };

  return {
    searchParams,
    setSearchParams,
    updateSearchParams
  };
};
