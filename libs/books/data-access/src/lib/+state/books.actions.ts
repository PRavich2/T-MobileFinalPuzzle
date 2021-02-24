import { createAction, props } from '@ngrx/store';
import { Book } from '@tmo/shared/models';

export enum BookSearchActions {
  SearchBook = '[Books Search Bar] Search',
  SearchBookSuccess = '[Book Search API] Search success',
  SearchBookFailure = '[Book Search API] Search failure',
  ClearSearch = '[Books Search Bar] Clear Search'
};

export const searchBooks = createAction(
  BookSearchActions.SearchBook,
  props<{ term: string }>()
);

export const searchBooksSuccess = createAction(
  BookSearchActions.SearchBookSuccess,
  props<{ books: Book[] }>()
);

export const searchBooksFailure = createAction(
  BookSearchActions.SearchBookFailure,
  props<{ error: any }>()
);

export const clearSearch = createAction(BookSearchActions.ClearSearch);
