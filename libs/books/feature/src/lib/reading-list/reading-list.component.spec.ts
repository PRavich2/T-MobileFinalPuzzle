import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SharedTestingModule,
  createReadingListItem
} from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Store } from '@ngrx/store';
import { removeFromReadingList } from '@tmo/books/data-access';
describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from the reading list', () => {
    component.removeFromReadingList(createReadingListItem('JAVA'));
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item: createReadingListItem('JAVA'), enableUndo: true }));
  });
});
