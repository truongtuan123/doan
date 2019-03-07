import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSideBarComponent } from './post-side-bar.component';

describe('PostSideBarComponent', () => {
  let component: PostSideBarComponent;
  let fixture: ComponentFixture<PostSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
