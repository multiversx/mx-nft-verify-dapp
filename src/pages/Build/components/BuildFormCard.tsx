import React, { useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useApiRequests } from 'hooks';
import { QueryParamEnum } from 'pages/Result/result.types';
import { AgeEnum } from 'types';
import {
  BuildFormValuesType,
  RadioElementType,
  VerificationType
} from '../build.types';
import { BuildFormInputGroup } from './BuildFormInputGroup';
import { BuildFormRadioGroup } from './BuildFormRadioGroup';
import { BuildFormSelectGroup } from './BuildFormSelectGroup';
import { GeneratedUrl } from './GeneratedUrl';

export interface BuildFormCardProps {
  validationSchema: yup.ObjectSchema<yup.AnyObject>;
  ageSelectOptions: { value: string; label: string }[];
}

export const BuildFormCard = ({
  validationSchema,
  ageSelectOptions
}: BuildFormCardProps) => {
  const [verificationType, setVerificationType] =
    useState<VerificationType>('scanner');
  const [isUrlLoading, setIsUrlLoading] = useState(false);
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
    domain.searchParams.append(QueryParamEnum.type, verificationType);
    domain.searchParams.append(QueryParamEnum.switcher, 'true');

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
    setIsUrlLoading(true);
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

      setIsUrlLoading(false);
      return;
    }

    showComputedUrl(values);
    setIsUrlLoading(false);
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

  const radioElements: RadioElementType[] = [
    { id: 'pos', value: 'pos', label: 'PoS' },
    { id: 'scanner', value: 'scanner', label: 'Scanner', checked: true }
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

        <BuildFormRadioGroup
          elements={radioElements}
          title='Prefered'
          setVerificationType={setVerificationType}
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
      <GeneratedUrl url={generatedUrl} isUrlLoading={isUrlLoading} />
    </div>
  );
};
