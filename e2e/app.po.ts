export class VkPostCommentatorsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('vk-post-commentators-app p')).getText();
  }
}
