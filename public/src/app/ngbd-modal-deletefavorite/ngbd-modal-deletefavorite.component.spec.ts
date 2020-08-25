import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalDeletefavoriteComponent } from './ngbd-modal-deletefavorite.component';

describe('NgbdModalDeletefavoriteComponent', () => {
  let component: NgbdModalDeletefavoriteComponent;
  let fixture: ComponentFixture<NgbdModalDeletefavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalDeletefavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalDeletefavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
