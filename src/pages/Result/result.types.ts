import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ReactNode } from 'react';

export enum QueryParamEnum {
  collection = 'collection',
  pixel = 'pixel',
  callback = 'callback',
  age = 'age',
  ref = 'ref',
  type = 'type',
  switcher = 'switcher'
}

export class ResultMessageState {
  constructor(
    public className: string = '',
    public description: string = '',
    public icon: IconDefinition = faQuestionCircle,
    public title: string | ReactNode = ''
  ) {}
}
