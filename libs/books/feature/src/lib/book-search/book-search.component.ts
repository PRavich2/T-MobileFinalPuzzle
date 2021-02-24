import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
  getBooksError,
  ReadingListBook
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, OkReadsConstants } from '@tmo/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);
  booksErrors$: Observable<string> = this.store.select(getBooksError);
  booksErrorMessage: string = OkReadsConstants.errorMessage;
  
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }
  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue(OkReadsConstants.defaultValue);
    this.searchBooks();
  }

  searchBooks() {
    this.searchForm.value.term
    ? this.store.dispatch(searchBooks({ term: this.searchTerm }))
    : this.store.dispatch(clearSearch());
  }
}
