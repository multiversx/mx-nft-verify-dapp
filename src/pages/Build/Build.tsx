import React, { useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { useFormik } from 'formik';
import { useApiRequests } from 'hooks/network';
import { QueryParamEnum } from 'pages/Result/result.types';
import { AgeEnum } from 'types';
import { BuildFormValuesType } from './build.types';
import { BuildFormInputGroup, BuildFormSelectGroup } from './components';
import { validationSchema } from './validation';

export const Build = () => {
  const [generatedUrl, setGeneratedUrl] = useState('');

  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getCollectionNfts } = useApiRequests();

  const initialValues: BuildFormValuesType = {
    collectionId: '',
    callbackUrl: '',
    age: AgeEnum.oneDay
  };

  const showComputedUrl = (values: BuildFormValuesType) => {
    const { collectionId, callbackUrl, age } = values;
    const domain = new URL(`${window.location.origin}/verify`);

    domain.searchParams.append(QueryParamEnum.collectionId, collectionId);

    if (callbackUrl) {
      domain.searchParams.append(QueryParamEnum.callbackUrl, callbackUrl);
    }
    domain.searchParams.append(QueryParamEnum.age, age);

    setGeneratedUrl(domain.href);
  };

  const onSubmit = async (values: BuildFormValuesType) => {
    // Before computing the URL, at first we must validate that the collectionId is valid
    const response = await getCollectionNfts({
      apiAddress,
      collection: values.collectionId
    });

    if (!response.data) {
      setErrors({
        ...errors,
        collectionId: 'This collection does not exist'
      });

      return;
    }

    showComputedUrl(values);
  };

  const {
    values,
    handleChange,
    errors,
    setErrors,
    touched,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const ageSelectOptions = [
    {
      value: '1 hour'
    },
    {
      value: '1 day',
      selected: true
    },
    {
      value: '1 week'
    },
    {
      value: '1 month'
    },
    {
      value: '1 year'
    }
  ];

  const isCollectionIdError =
    QueryParamEnum.collectionId in errors &&
    QueryParamEnum.collectionId in touched;

  const isCallbackUrlError =
    QueryParamEnum.callbackUrl in errors &&
    QueryParamEnum.callbackUrl in touched;

  return (
    <section className='build d-flex flex-column justify-content-center flex-fill align-items-center container'>
      <form className='build-form' onSubmit={handleSubmit}>
        <BuildFormInputGroup
          id={QueryParamEnum.collectionId}
          placeholder='E.g. MOS-b9b4b2'
          labelValue='Collection ID'
          value={values.collectionId}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={isCollectionIdError}
          error={errors.collectionId}
          className='foo'
        />

        <BuildFormInputGroup
          id={QueryParamEnum.callbackUrl}
          placeholder='E.g. https://example.com'
          labelValue='Callback URL'
          value={values.callbackUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={isCallbackUrlError}
          error={errors.callbackUrl}
        />
        <BuildFormSelectGroup
          id={QueryParamEnum.age}
          labelValue='Age'
          onChange={handleChange}
          options={ageSelectOptions}
        />

        <button type='submit' className='btn btn-primary'>
          Generate URL
        </button>
      </form>

      <div className='d-flex align-items-center'>
        <div className='build-generated-url'>{generatedUrl}</div>
        {generatedUrl && <CopyButton text={generatedUrl} />}
      </div>
    </section>
  );
};
