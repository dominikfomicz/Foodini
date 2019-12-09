import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCardPage } from './map-card.page';

describe('MapCardPage', () => {
  let component: MapCardPage;
  let fixture: ComponentFixture<MapCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
