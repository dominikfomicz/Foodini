import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCardPage } from './filter-card.page';

describe('FilterCardPage', () => {
  let component: FilterCardPage;
  let fixture: ComponentFixture<FilterCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
