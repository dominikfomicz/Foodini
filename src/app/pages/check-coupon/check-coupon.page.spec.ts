import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCouponPage } from './check-coupon.page';

describe('CheckCouponPage', () => {
  let component: CheckCouponPage;
  let fixture: ComponentFixture<CheckCouponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCouponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
