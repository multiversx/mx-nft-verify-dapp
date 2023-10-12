import { AgeEnum } from 'types';

export type VerificationType = 'pos' | 'scanner';

export interface BuildFormValuesType {
  collection: string;
  pixel: string;
  callback?: string;
  age: AgeEnum;
  ref: string;
}

export interface RadioElementType {
  id: string;
  value: VerificationType;
  label: string;
  checked?: boolean;
}

export enum VerificationTypeEnum {
  pos = 'pos',
  scanner = 'scanner'
}
