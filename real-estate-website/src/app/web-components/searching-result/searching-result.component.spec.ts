import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingResultComponent } from './searching-result.component';

describe('SearchingResultComponent', () => {
  let component: SearchingResultComponent;
  let fixture: ComponentFixture<SearchingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
