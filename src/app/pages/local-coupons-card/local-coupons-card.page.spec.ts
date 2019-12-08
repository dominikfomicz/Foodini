import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCouponsCardPage } from './local-coupons-card.page';

describe('LocalCouponsCardPage', () => {
  let component: LocalCouponsCardPage;
  let fixture: ComponentFixture<LocalCouponsCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalCouponsCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCouponsCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
