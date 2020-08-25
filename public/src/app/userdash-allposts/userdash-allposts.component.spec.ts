import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashAllpostsComponent } from './userdash-allposts.component';

describe('UserdashAllpostsComponent', () => {
  let component: UserdashAllpostsComponent;
  let fixture: ComponentFixture<UserdashAllpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdashAllpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashAllpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
