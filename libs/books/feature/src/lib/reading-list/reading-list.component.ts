import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, finishFromReading } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$: Observable<ReadingListItem[]> = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  finishedBookFromReadingList(item: ReadingListItem) {
    this.store.dispatch(
      finishFromReading({ item, finishedDate: new Date().toISOString() })
    );
  }
}
