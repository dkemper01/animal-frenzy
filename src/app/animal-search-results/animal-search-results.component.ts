import { Component, Input, AfterViewChecked, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ItemInfo, Items } from '../items';
import { ImageObjectInfo } from '../imageObject';
import { PageMap } from '../pageMap';
import '../../../node_modules/modernizr/modernizr.js';
import 'imagesloaded';
import 'desandro-classie';
import 'masonry-layout';

@Component({
  selector: 'animal-search-results',
  templateUrl: './animal-search-results.component.html',
  styleUrls: ['./animal-search-results.component.scss']
})

export class AnimalSearchResultsComponent implements OnInit {

	@Input() results: Array<ImageObjectInfo>;
	cbpGridGallery: CBPGridGallery;
	changesDetected: boolean;
	initInvoked: boolean;
	
  constructor() { }
	
	ngOnChanges(changes: SimpleChanges) {
		
		if (!this.initInvoked) { 
			return; 
		}
		
		this.changesDetected = true;
	}
	
	ngOnInit() {
		this.initInvoked = true;	
  }
	
	ngAfterViewChecked() {
		
		if (this.changesDetected) {
			
			if (this.cbpGridGallery) {
				this.cbpGridGallery.destroy();
				this.cbpGridGallery = null;
			}
			
			this.cbpGridGallery = new CBPGridGallery(document.getElementById('grid-gallery'));
		}
		
		this.changesDetected = false;
	}
	
	ngOnDestroy() {
		if (this.cbpGridGallery) {
			this.cbpGridGallery.destroy();
		}
	}
}
