import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AnimalSearchService } from './animal-search.service';
import { AnimalSearchComponent } from './animal-search/animal-search.component';
import { AnimalSearchResultsComponent } from './animal-search-results/animal-search-results.component';
import { TinyeditorComponent } from './tinyeditor/tinyeditor.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalSearchComponent,
    AnimalSearchResultsComponent,
    TinyeditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
	providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
