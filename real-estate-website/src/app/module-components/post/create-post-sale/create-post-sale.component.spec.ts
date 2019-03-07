import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostSaleComponent } from './create-post-sale.component';

describe('CreatePostSaleComponent', () => {
  let component: CreatePostSaleComponent;
  let fixture: ComponentFixture<CreatePostSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePostSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
