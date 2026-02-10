import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBtn } from './delete-btn';

describe('DeleteBtn', () => {
  let component: DeleteBtn;
  let fixture: ComponentFixture<DeleteBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
