import React, { useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { useFormik } from 'formik';
import { useApiRequests } from 'hooks';
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
    collection: '',
    pixel: '',
    callback: '',
    age: AgeEnum.oneDay,
    ref: ''
  };

  const showComputedUrl = (values: BuildFormValuesType) => {
    const { collection, pixel, callback, age, ref } = values;
    const domain = new URL(`${window.location.origin}/verify`);

    domain.searchParams.append(QueryParamEnum.collection, collection);
    domain.searchParams.append(QueryParamEnum.age, age);

    if (pixel) {
      domain.searchParams.append(QueryParamEnum.pixel, pixel);
    }

    if (callback) {
      domain.searchParams.append(QueryParamEnum.callback, callback);
    }

    if (ref) {
      domain.searchParams.append(QueryParamEnum.ref, ref);
    }

    setGeneratedUrl(domain.href);
  };

  const onSubmit = async (values: BuildFormValuesType) => {
    // Before computing the URL, at first we must validate that the collection is valid
    const response = await getCollectionNfts({
      apiAddress,
      collection: values.collection
    });

    if (!response.data || !response.data.length) {
      setErrors({
        ...errors,
        collection: 'This collection does not exist'
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
      value: '3600',
      label: '1 hour'
    },
    {
      value: '86400',
      label: '1 day',
      selected: true
    },
    {
      value: '604800',
      label: '1 week'
    },
    {
      value: '2628288',
      label: '1 month'
    },
    {
      value: '31556952',
      label: '1 year'
    }
  ];

  const isCollectionError =
    QueryParamEnum.collection in errors && QueryParamEnum.collection in touched;

  const isPixelError =
    QueryParamEnum.pixel in errors && QueryParamEnum.pixel in touched;

  const isCallbackUrlError =
    QueryParamEnum.callback in errors && QueryParamEnum.callback in touched;

  const isRefError =
    QueryParamEnum.ref in errors && QueryParamEnum.ref in touched;

  return (
    <section className='build'>
      <div className='card'>
        <h2 className='build-title'>Build URL</h2>
        <form className='build-form' onSubmit={handleSubmit}>
          <BuildFormInputGroup
            id={QueryParamEnum.collection}
            placeholder='E.g. MOS-b9b4b2'
            labelValue='Collection'
            value={values.collection}
            onChange={handleChange}
            onBlur={handleBlur}
            isError={isCollectionError}
            error={errors.collection}
          />

          <BuildFormInputGroup
            id={QueryParamEnum.pixel}
            placeholder='E.g. https://example.com'
            labelValue='Pixel'
            tooltipInfo={
              'URL being fetched in the background with every successful check'
            }
            isOptional
            value={values.pixel}
            onChange={handleChange}
            onBlur={handleBlur}
            isError={isPixelError}
            error={errors.pixel}
          />

          <BuildFormInputGroup
            id={QueryParamEnum.callback}
            placeholder='E.g. https://example.com'
            labelValue='Callback'
            tooltipInfo='URL where the user is redirected to after every successful check.'
            isOptional
            value={values.callback}
            onChange={handleChange}
            onBlur={handleBlur}
            isError={isCallbackUrlError}
            error={errors.callback}
          />
          <BuildFormInputGroup
            id={QueryParamEnum.ref}
            labelValue='Reference'
            tooltipInfo='Used to store app internal IDs or state references for the users.'
            isOptional
            value={values.ref}
            isError={isRefError}
            error={errors.ref}
            onChange={handleChange}
            onBlur={handleBlur}
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
        {generatedUrl && (
          <div className='build-generated-url-wrapper'>
            <div className='build-generated-url'>
              <a
                href={generatedUrl}
                title={generatedUrl}
                {...{
                  target: '_blank'
                }}
              >
                {generatedUrl}
              </a>
            </div>
            <CopyButton text={generatedUrl} />
          </div>
        )}
      </div>
    </section>
  );
};
