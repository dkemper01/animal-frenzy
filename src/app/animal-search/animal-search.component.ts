import { Component, OnInit } from '@angular/core';
import { AnimalSearchService } from '../animal-search.service';
import { ImageObjectInfo, ImageObject } from '../imageObject';

@Component({
providers: [AnimalSearchService],
  selector: 'animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.scss']
})

export class AnimalSearchComponent implements OnInit {

	results: Array<ImageObjectInfo>;
	
  constructor(private searchService: AnimalSearchService) { }

  ngOnInit() {
		
  }
	
	public getResults(searchTerms: string) {
		this.searchService.getItems(searchTerms).then((results: Array<ImageObjectInfo>) => { this.results = results; });
	}

}
