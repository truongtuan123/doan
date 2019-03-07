import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVideoComponent } from './project-video.component';

describe('ProjectVideoComponent', () => {
  let component: ProjectVideoComponent;
  let fixture: ComponentFixture<ProjectVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
