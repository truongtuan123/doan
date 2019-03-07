import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProjectPhotoComponent } from './upload-project-photo.component';

describe('UploadProjectPhotoComponent', () => {
  let component: UploadProjectPhotoComponent;
  let fixture: ComponentFixture<UploadProjectPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProjectPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProjectPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
