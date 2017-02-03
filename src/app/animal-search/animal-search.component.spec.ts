/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ImageObjectInfo, ImageObject } from '../imageObject';
import { TinyeditorComponent } from '../tinyeditor/tinyeditor.component';
import { AnimalSearchService } from '../animal-search.service';
import { AnimalSearchResultsComponent } from '../animal-search-results/animal-search-results.component';
import { AnimalSearchComponent } from './animal-search.component';

describe('AnimalSearchComponent', () => {
  let component: AnimalSearchComponent;
  let fixture: ComponentFixture<AnimalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TinyeditorComponent, AnimalSearchResultsComponent, AnimalSearchComponent ],
			providers: [AnimalSearchService],
			imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
