import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMainImgBtn } from './set-main-img-btn';

describe('SetMainImgBtn', () => {
  let component: SetMainImgBtn;
  let fixture: ComponentFixture<SetMainImgBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetMainImgBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetMainImgBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
