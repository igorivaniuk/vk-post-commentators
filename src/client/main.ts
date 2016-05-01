import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {environment} from './app/environment';
import {VkPostCommentatorsApp} from './app/vk-post-commentators.component';

if (environment.production) {
  enableProdMode();
}

bootstrap(VkPostCommentatorsApp);
