import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttextComponent } from './posttext.component';

describe('PosttextComponent', () => {
  let component: PosttextComponent;
  let fixture: ComponentFixture<PosttextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosttextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
