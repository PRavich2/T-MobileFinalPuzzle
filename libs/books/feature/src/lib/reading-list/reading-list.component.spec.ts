import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Store } from '@ngrx/store';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from the reading list', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.removeFromReadingList(createReadingListItem('JAVA'));
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should finished the Book From ReadingList', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.finishedBookFromReadingList(createReadingListItem('JAVA'));
    expect(dispatchSpy).toHaveBeenCalled();
  });

});
