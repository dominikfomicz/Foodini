import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapItemCardPage } from './map-item-card.page';

describe('SearchFilterPage', () => {
  let component: MapItemCardPage;
  let fixture: ComponentFixture<MapItemCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapItemCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapItemCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
