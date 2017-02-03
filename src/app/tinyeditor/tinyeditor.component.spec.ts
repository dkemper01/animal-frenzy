/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TinyeditorComponent } from './tinyeditor.component';

describe('TinyeditorComponent', () => {
  let component: TinyeditorComponent;
  let fixture: ComponentFixture<TinyeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinyeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
