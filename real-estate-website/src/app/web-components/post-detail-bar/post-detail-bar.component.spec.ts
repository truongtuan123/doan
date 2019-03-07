import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailBarComponent } from './post-detail-bar.component';

describe('PostDetailBarComponent', () => {
  let component: PostDetailBarComponent;
  let fixture: ComponentFixture<PostDetailBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
