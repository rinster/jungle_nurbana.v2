import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashprofileComponent } from './userdashprofile.component';

describe('UserdashprofileComponent', () => {
  let component: UserdashprofileComponent;
  let fixture: ComponentFixture<UserdashprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdashprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
