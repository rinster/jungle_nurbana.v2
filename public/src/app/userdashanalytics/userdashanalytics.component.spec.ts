import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashanalyticsComponent } from './userdashanalytics.component';

describe('UserdashanalyticsComponent', () => {
  let component: UserdashanalyticsComponent;
  let fixture: ComponentFixture<UserdashanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdashanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
