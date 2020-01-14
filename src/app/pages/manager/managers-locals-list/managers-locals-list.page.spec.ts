import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersLocalsListPage } from './managers-locals-list.page';

describe('ManagersLocalsListPage', () => {
  let component: ManagersLocalsListPage;
  let fixture: ComponentFixture<ManagersLocalsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersLocalsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersLocalsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
