import {
  beforeEachProviders,
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {ErrorService} from './error.service';

describe('Error Service', () => {

  beforeEachProviders(() => [ErrorService]);
  
  it('should ...', inject([ErrorService], (service: ErrorService) => {

  }));

});
