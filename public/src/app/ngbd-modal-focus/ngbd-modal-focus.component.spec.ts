import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalFocusComponent } from './ngbd-modal-focus.component';

describe('NgbdModalFocusComponent', () => {
  let component: NgbdModalFocusComponent;
  let fixture: ComponentFixture<NgbdModalFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
