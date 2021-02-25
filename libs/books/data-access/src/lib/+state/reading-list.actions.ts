import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export enum ReadingListActions {
  Init = '[Reading List] Initialize',
  LoadReadingListSuccess = '[Reading List API] Load list success',
  LoadReadingListError = '[Reading List API] Load list error',
  AddToReadingList = '[Books Search Results] Add to list',
  FailedAddToReadingList = '[Reading List API] Failed add to list',
  ConfirmedAddToReadingList = '[Reading List API] Confirmed add to list',
  RemoveFromReadingList = '[Books Search Results] Remove from list',
  FailedRemoveFromReadingList = '[Reading List API] Failed remove from list',
  confirmedRemoveFromReadingList = '[Reading List API] Confirmed remove from list',
  FinishFromReading = '[Reading List API] Finish book from list',
  FailedFinishedReading = '[Reading List API] Failed Finished from list'
};

export const init = createAction(ReadingListActions.Init);

export const loadReadingListSuccess = createAction(
  ReadingListActions.LoadReadingListSuccess,
  props<{ list: ReadingListItem[] }>()
);

export const loadReadingListError = createAction(
  ReadingListActions.LoadReadingListError,
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  ReadingListActions.AddToReadingList,
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  ReadingListActions.FailedAddToReadingList,
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  ReadingListActions.ConfirmedAddToReadingList,
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  ReadingListActions.RemoveFromReadingList,
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  ReadingListActions.FailedRemoveFromReadingList,
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  ReadingListActions.confirmedRemoveFromReadingList,
  props<{ item: ReadingListItem }>()
);

export const finishFromReading = createAction(
  ReadingListActions.FinishFromReading,
  props<{ item: ReadingListItem, finishedDate: string }>()
);

export const failedFinishedReading = createAction(
  ReadingListActions.FailedFinishedReading,
  props<{ item: ReadingListItem}>()
); 