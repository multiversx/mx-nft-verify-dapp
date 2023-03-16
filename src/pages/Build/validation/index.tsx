import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  collection: yup
    .string()
    .matches(new RegExp('.+-[a-zA-Z0-9]{6}$'), {
      message: 'Invalid collection pattern'
    })
    .required('Required'),
  pixel: yup.string().url('Invalid URL pattern'),
  callback: yup.string().url('Invalid URL pattern'),
  ref: yup.string().max(100, 'Maximum limit is 100 characters')
});
