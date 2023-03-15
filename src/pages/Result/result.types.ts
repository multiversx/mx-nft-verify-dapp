import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export enum QueryParamEnum {
  collection = 'collection',
  pixel = 'pixel',
  callback = 'callback',
  age = 'age',
  ref = 'ref'
}

export class ResultMessageState {
  constructor(
    public className: string = '',
    public description: string = '',
    public icon: IconDefinition = faQuestionCircle,
    public title: string = ''
  ) {}
}
