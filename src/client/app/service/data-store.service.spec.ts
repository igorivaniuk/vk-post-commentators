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
import {DataStoreService} from './data-store.service';

describe('DataStore Service', () => {

  beforeEachProviders(() => [DataStoreService]);
  
  it('should ...', inject([DataStoreService], (service: DataStoreService) => {

  }));

});
