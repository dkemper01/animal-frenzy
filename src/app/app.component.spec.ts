/* tslint:disable:no-unused-variable */
import { HttpModule } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AnimalSearchResultsComponent } from './animal-search-results/animal-search-results.component';
import { AnimalSearchComponent } from './animal-search/animal-search.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalSearchResultsComponent, AnimalSearchComponent, AppComponent],
			imports: [HttpModule]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Animal Frenzy'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Animal Frenzy');
  }));

  it('should contain animal-search element', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('div.search-controls') === null).toBe(false);
  }));
});
