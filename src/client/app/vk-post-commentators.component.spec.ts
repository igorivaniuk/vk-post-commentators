import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {VkPostCommentatorsApp} from '../app/vk-post-commentators.component';

beforeEachProviders(() => [VkPostCommentatorsApp]);

describe('App: VkPostCommentators', () => {
  it('should have the `defaultMeaning` as 42', inject([VkPostCommentatorsApp], (app: VkPostCommentatorsApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([VkPostCommentatorsApp], (app: VkPostCommentatorsApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

