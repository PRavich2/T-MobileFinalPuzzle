import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
    await $('.reading-list-container h2 button').click();

    // Adding a book to the reading list with undo action
    const form = await $('form');
    const input = await $('input[type="search"]');
    input.sendKeys('Python');
    await form.submit();
    await $$('.book--content--info div button:enabled').first().click();
  });
  
  it('Then: I should be able to undo addition of a book to my reading list', async () => {
    let readingList = await $('[data-testing="reading-list-item"]');
    const initialReadingListLength = readingList.length;
    await browser.executeScript(`
      const undoButton = document.querySelector('simple-snack-bar button');
      undoButton.click();
    `);

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    readingList = await $('[data-testing="reading-list-item"]');
    expect(initialReadingListLength).toEqual(readingList.length);
  });

  it('Then: I should be able to undo removal of a book from my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    let readingList = await $('[data-testing="reading-list-item"]');
    const initialReadingListLength = readingList.length;

    // Removing a book from the reading list by undo action
    await $$('.reading-list-item div button').first().click();
    await browser.executeScript(`
        const undoButton = document.querySelector('simple-snack-bar button');
        undoButton.click();
      `);

    readingList = await $('[data-testing="reading-list-item"]');
    expect(initialReadingListLength).toEqual(readingList.length);
  });
});
