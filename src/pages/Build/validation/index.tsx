import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  collectionId: yup
    .string()
    .matches(new RegExp('.+-.{6}'), { message: 'Invalid collection pattern' })
    .required('Required'),
  callbackUrl: yup.string().url('Invalid URL pattern')
});
