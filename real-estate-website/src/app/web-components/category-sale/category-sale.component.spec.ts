import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySaleComponent } from './category-sale.component';

describe('CategorySaleComponent', () => {
  let component: CategorySaleComponent;
  let fixture: ComponentFixture<CategorySaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
