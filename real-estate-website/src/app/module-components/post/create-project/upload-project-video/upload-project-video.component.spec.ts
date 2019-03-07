import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProjectVideoComponent } from './upload-project-video.component';

describe('UploadProjectVideoComponent', () => {
  let component: UploadProjectVideoComponent;
  let fixture: ComponentFixture<UploadProjectVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProjectVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProjectVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
