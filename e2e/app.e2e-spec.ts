import { AnimalFrenzyPage } from './app.po';

describe('animal-frenzy App', () => {
  let page: AnimalFrenzyPage;

  beforeEach(() => {
    page = new AnimalFrenzyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
