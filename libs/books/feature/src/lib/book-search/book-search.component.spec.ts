import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule, createBook } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { Store } from '@ngrx/store';
import { clearSearch, addToReadingList } from '@tmo/books/data-access';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  
  describe('addBookToReadingList()', () => {
    it('dispatch selected books to reading list via addBookToReadingList function', () => {
    component.addBookToReadingList(createBook('A'));
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({ book: createBook('A') }));
    });
  });

  describe('searchBooks()', () => {
    it('search books execution before and after given interval', fakeAsync(() => {
      const searchBook = jest.spyOn(component, 'searchBooks');
      component.searchForm.patchValue({ term: 'testing search' });
      tick(300);
      expect(searchBook).not.toBeCalled();
      tick(200);
      expect(searchBook).toBeCalledTimes(1);
    }));

    it('should clear results if search term is empty', () => {
    component.searchForm.setValue({ term: '' });
    component.searchBooks();
    expect(dispatchSpy).toHaveBeenCalledWith(clearSearch());
    });
  });

  describe('ngOnDestroy()', () => {
    it('should handle unsubscription', fakeAsync(() => {
      component.ngOnDestroy();
      const searchBook = jest.spyOn(component, 'searchBooks');
      component.searchForm.patchValue({ term: 'testing search' });
      tick(500);
      expect(searchBook).not.toBeCalled();
    }));
  });
});
