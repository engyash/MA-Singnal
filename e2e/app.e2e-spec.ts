import { StockSignalPage } from './app.po';

describe('stock-signal App', () => {
  let page: StockSignalPage;

  beforeEach(() => {
    page = new StockSignalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
