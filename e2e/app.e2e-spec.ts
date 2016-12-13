import { AnimalFrenzyPage } from './app.po';

describe('animal-frenzy App', function() {
  let page: AnimalFrenzyPage;

  beforeEach(() => {
    page = new AnimalFrenzyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
