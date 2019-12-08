import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardPage } from './coupon-card.page';

describe('SearchFilterPage', () => {
  let component: CouponCardPage;
  let fixture: ComponentFixture<CouponCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
