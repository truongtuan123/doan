import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDesignComponent } from './project-design.component';

describe('ProjectDesignComponent', () => {
  let component: ProjectDesignComponent;
  let fixture: ComponentFixture<ProjectDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
