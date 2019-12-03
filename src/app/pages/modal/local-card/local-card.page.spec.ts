import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCardPage } from './local-card.page';

describe('SearchFilterPage', () => {
  let component: LocalCardPage;
  let fixture: ComponentFixture<LocalCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
