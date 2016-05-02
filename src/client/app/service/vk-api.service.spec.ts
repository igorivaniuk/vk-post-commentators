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
import {VkApiService} from './vk-api.service';

describe('VkApi Service', () => {

  beforeEachProviders(() => [VkApiService]);
  
  it('should ...', inject([VkApiService], (service: VkApiService) => {

  }));

});
