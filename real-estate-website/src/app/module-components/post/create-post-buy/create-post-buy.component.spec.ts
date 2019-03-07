import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostBuyComponent } from './create-post-buy.component';

describe('CreatePostBuyComponent', () => {
  let component: CreatePostBuyComponent;
  let fixture: ComponentFixture<CreatePostBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePostBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
