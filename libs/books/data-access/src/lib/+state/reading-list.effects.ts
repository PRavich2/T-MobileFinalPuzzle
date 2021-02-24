import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  tap
} from 'rxjs/operators';
import { ReadingListItem, OkReadsConstants } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book, enableUndo }) =>
        this.http.post('/api/reading-list', book).pipe(
          tap(() => {
            if (enableUndo) {
              const { addedMessgae, action, duration } = OkReadsConstants;
              const addSnackBar = this.snackBar.open(
                addedMessgae,
                action,
                duration
              );
              addSnackBar.onAction().subscribe(() => {
                const { id, ...rest } = book;
                this.store.dispatch(
                  ReadingListActions.removeFromReadingList({
                    item: { bookId: id, ...rest },
                    enableUndo: false
                  })
                );
              });
            }
          }),
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item, enableUndo }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          tap(() => {
            if (enableUndo) {
              const { removedMessage, action, duration } = OkReadsConstants;
              const addSnackBar = this.snackBar.open(
                removedMessage,
                action,
                duration
              );
              addSnackBar.onAction().subscribe(() => {
                const { bookId, ...rest } = item;
                this.store.dispatch(
                  ReadingListActions.addToReadingList({
                    book: { id: bookId, ...rest },
                    enableUndo: false
                  })
                );
              });
            }
          }),
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient, private readonly store: Store, private snackBar: MatSnackBar) {}
}
