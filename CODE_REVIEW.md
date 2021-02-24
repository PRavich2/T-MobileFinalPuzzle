**Are there any problems or code smells in the app?**

    1. Test case fails When running the code:

        - Fixed the failed test case in the READING-LIST.REDUCER.SPECS.TS for missed out the reducers in reading-list.reducer.ts

        - Added test cases for the add book to readlist and remove book from readlist in the file READING-LIST.REDUCER.SPECS.TS.

    2.  Without unsubscribe causes Memory leak which can handle by using ```async``` instead of subsrciption which handles the memory leaks by its own.

    3. Missed accessibilities are added and its passed 100% using lighthouse.

    4. Types not properly defined, use relevant types or void if function not return anything, For instance reading list component.

    5. In Book Search component instead of writing seperate dateformat we can format by using filter pipe in html itself which is implemented.

    6. All actions names can be export by single enum constant.

    7. Code cleanup at some places to remove unwanted logs.

**Accessibilities(a11y) Using Light House:**

    1. It was not reading "try search for the topic, for example 'Javascript'" not give much contrast visible.

    2. Reading List side bar title was not captured.

    3. Search button was read as button only, it should be search button.

    4. Tested entire application with Light House with 100% pass result.

**Manual Check for accessibility issue**

    1. The image elements in book search component did not have ```alt``` attributes.

    2. The image elements in reading list component did not have ```alt``` attributes.

    3. The search button of the search bar does not have ```aria-label``` attribute or text which makes hard to access.

**Are there other improvements you would make to the app? (implemented)**

    1. Missed out the error message to display when we subscribe book- getbooks.(Fixed)

    2. We can utilize ternary opertor in `searchBooks()` function for better readability.(Fixed)

    3. Instead of direct hardcoading, we can fetch it from constant files. (Example: searchExample() javascript value in book-search.component.ts : Fixed)

    4. Code cleanup at some places to remove unwanted logs.(Fixed)
