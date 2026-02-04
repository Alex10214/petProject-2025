import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberImages } from './member-images';

describe('MemberImages', () => {
  let component: MemberImages;
  let fixture: ComponentFixture<MemberImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
