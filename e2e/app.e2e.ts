import { VkPostCommentatorsPage } from './app.po';

describe('vk-post-commentators App', function() {
  let page: VkPostCommentatorsPage;

  beforeEach(() => {
    page = new VkPostCommentatorsPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('vk-post-commentators Works!');
  });
});
