/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http'
import { AnimalSearchService } from './animal-search.service';

describe('AnimalSearchService', () => {
	
	let service: AnimalSearchService = null;
	
	beforeEach(() => {	
		TestBed.configureTestingModule({
      providers: [AnimalSearchService],
			imports: [HttpModule]
    });	
	});
	
	beforeEach(inject([AnimalSearchService], (animalSearchService: AnimalSearchService)=> {
    service = animalSearchService; 
  }));

	it('should retrieve ten or less items', (done) => {
		expect(service).toBeTruthy();
		var promiseArray = service.getItems("giant pacific octupus");
		promiseArray.then(result => { 
			console.log(result); 
			expect(result.length <= 10).toBeTruthy();
			done();
		});
	});
	
});
