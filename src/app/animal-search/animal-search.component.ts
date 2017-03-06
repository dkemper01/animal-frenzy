import { Component, OnInit } from '@angular/core';
import { AnimalSearchService } from '../animal-search.service';
import { ImageObjectInfo, ImageObject } from '../imageObject';
import { Observable }  from 'rxjs/Observable';
import { Subject }     from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
providers: [AnimalSearchService],
  selector: 'animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.scss']
})

export class AnimalSearchComponent implements OnInit {

	private searchTerms = new Subject<string>();
	resultsAsync: Observable<Array<ImageObjectInfo>>;
	results: Array<ImageObjectInfo>;
	
  constructor(private searchService: AnimalSearchService) { }

  ngOnInit() {
		this.resultsAsync = this.searchTerms
			.debounceTime(500)
			.distinctUntilChanged()
			.switchMap(term => term ? this.searchService.getItemsAsync(term) : Observable.of<Array<ImageObjectInfo>>([]))
			.catch(error => {
        	console.log(error);
        	return Observable.of<Array<ImageObjectInfo>>([]);
      });
  }
	
	public getResults(searchTerms: string) {
		if (searchTerms && searchTerms.length) {
				this.searchService.getItems(searchTerms).then((results: Array<ImageObjectInfo>) => { this.results = results; });
		}
	}
	
	public getResultsAsync(searchTerm: string) {
		this.searchTerms.next(searchTerm);
	}

}
