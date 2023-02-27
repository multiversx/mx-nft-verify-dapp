import React, { useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { useFormik } from 'formik';
import { CopyButton } from 'components';
import { useApiRequests } from 'hooks/network';
import { validationSchema } from './validation';

export const Build = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string>('');

  const {
    network: { apiAddress }
  } = useGetNetworkConfig();

  const { getCollectionNfts } = useApiRequests();

  const initialValues = {
    collectionId: '',
    callbackUrl: '',
    age: '24h'
  };

  const onSubmit = async ({
    collectionId,
    callbackUrl,
    age
  }: typeof initialValues) => {
    const response = await getCollectionNfts({
      apiAddress,
      collection: collectionId
    });

    if (!response.data) {
      setErrors({
        ...errors,
        collectionId: 'This collection does not exist'
      });

      return;
    }

    const domain = new URL(`${window.location.origin}/verify`);

    domain.searchParams.append('collectionId', collectionId);

    if (callbackUrl) {
      domain.searchParams.append('callbackUrl', callbackUrl);
    }
    domain.searchParams.append('age', age);

    setGeneratedUrl(domain.href);
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

  const isCollectionIdError =
    'collectionId' in errors && 'collectionId' in touched;

  const isCallbackUrlError =
    'callbackUrl' in errors && 'callbackUrl' in touched;

  return (
    <section className='build d-flex flex-column justify-content-center flex-fill align-items-center container'>
      <form className='build-form' onSubmit={handleSubmit}>
        <div className='form-group position-relative'>
          <label htmlFor='collectionId'>Collection ID *</label>
          <input
            className={`form-control ${isCollectionIdError && 'input-error'}`}
            type='text'
            id='collectionId'
            placeholder='E.g. MOS-b9b4b2'
            value={values.collectionId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {isCollectionIdError && (
            <span className='error'>{errors.collectionId}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='callbackUrl'>Callback URL</label>
          <input
            className={`form-control ${isCallbackUrlError && 'input-error'}`}
            type='text'
            id='callbackUrl'
            placeholder='E.g. https://example.com'
            value={values.callbackUrl}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {isCallbackUrlError && (
            <span className='error'>{errors.callbackUrl}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='age'>Age</label>
          <select className='form-control' id='age' onChange={handleChange}>
            <option>1 hour</option>
            <option selected>1 day</option>
            <option>1 week</option>
            <option>1 month</option>
            <option>1 year</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Generate URL
        </button>
      </form>

      <div className='d-flex align-items-center'>
        <div className='build-generated-url'>{generatedUrl}</div>
        {generatedUrl && (
          <CopyButton
            text={generatedUrl}
            successMessage='URL copied to clipboard'
          />
        )}
      </div>
    </section>
  );
};
