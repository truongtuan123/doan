import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProjectMapComponent } from './upload-project-map.component';

describe('UploadProjectMapComponent', () => {
  let component: UploadProjectMapComponent;
  let fixture: ComponentFixture<UploadProjectMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProjectMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProjectMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
