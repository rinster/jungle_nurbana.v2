import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashfavComponent } from './userdashfav.component';

describe('UserdashfavComponent', () => {
  let component: UserdashfavComponent;
  let fixture: ComponentFixture<UserdashfavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdashfavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashfavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
