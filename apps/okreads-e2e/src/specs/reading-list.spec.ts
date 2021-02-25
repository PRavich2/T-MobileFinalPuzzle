import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
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
  });

  it('should be able to add book to reading list and be able to mark book as finished reading', async () => {
    await $('.reading-list-container h2 button').click();
    // Implement this test!
    const form = await $('form');
    const input = await $('input[type="search"]');
    input.sendKeys('Typescript');
    await form.submit();

    //Added to Reading List
    const addElement = await $$('.book--content--info button:enabled').first();
    await $$('.book--content--info button:enabled').first().click();

    //toggle the reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    // get the finish button
    const lastEle = await $$('.reading-list-content button').last();
    lastEle.click();
    
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $$('.reading-list-item--finished').last(),
        'Finished'
      )
    );
    await $('.reading-list-container h2 button').click();
    await readingListToggle.click();

    // check the book able to remove even after finished
    const removeBook = await $$('.reading-list-content')
      .$$('#reading-book-items button')
      .first();
    removeBook.click();
  });
});
