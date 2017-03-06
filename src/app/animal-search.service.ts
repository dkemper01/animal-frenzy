import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImageObjectInfo, ImageObject } from './imageObject';
import { PageMap } from './pageMap';
import { ItemInfo, Items } from './items'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnimalSearchService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private readonly cx = '017399694708952684169%3Ai75sqt8j8ko';
    private readonly apiKey = 'AIzaSyAvn8SAwatK2SnhTPtY29T02LisZ7JSI78';
	private readonly safetyLevel = 'high';
	private readonly searchUrl = 'https://www.googleapis.com/customsearch/v1?';
	
	constructor(private http: Http) { }
	
	public getItems(terms: string): Promise<Array<ImageObjectInfo>> {
		
		let queryParams = `q=${terms}&cx=${this.cx}&key=${this.apiKey}&safe=${this.safetyLevel}&searchType=image`;
		// The Angular http.get returns an RxJS Observable.  We convert it to a promise.  
		// 
    	return this.http.get(this.searchUrl + queryParams)
			.toPromise()
			// In the promise's `then` callback we call the json method of the HTTP Response 
			// to extract the data within the response.
			//
			.then(response => this.extractData(response))
			.catch(this.handleError);
	}
	
	public getItemsAsync(terms: string): Observable<Array<ImageObjectInfo>> {
		
		let queryParams = `q=${terms}&cx=${this.cx}&key=${this.apiKey}&safe=${this.safetyLevel}&searchType=image`;
		
		// The Angular http.get returns an RxJS Observable.
		// 
    	return this.http.get(this.searchUrl + queryParams)
			.map(response => this.extractImage(response));
	}
	
	private extractData(res: Response): Array<ImageObjectInfo> {
		
    	let body = res.json();
		let searchItems = new Array<ImageObjectInfo>();
	
		console.log(body);

		body.items.forEach(item => {
			
			if (!item.pagemap) { return; } 
			
			const title = item.title;
			const temp: any = item.pagemap;
			const cseImage: Array<Object> = temp.cse_image;
			const vid: Array<Object> = temp.videoobject;
			let topImageObject: Array<ImageObjectInfo> = temp.imageobject as Array<ImageObjectInfo>;
			
			if (vid && vid.length > 0) {
				const img: ImageObjectInfo = new ImageObjectInfo();
				const thumb: string = (vid.pop())["thumbnailurl"];
				
				if (thumb) {
					img.src = thumb;
					img.title = title;
					this.add(searchItems, img);
				}
			} 

			if (cseImage && (cseImage.length > 0)) {
				const img: ImageObjectInfo = new ImageObjectInfo();
				img.src = (cseImage.pop())["src"];
				img.title = title;
				this.add(searchItems, img)
			} else if (topImageObject) {		
				topImageObject.forEach(img => {
					img.title = title;					
					img.src = (img.src && img.src.length) ? img.src : (img.contenturl && img.contenturl.length) ? img.contenturl : (img.image && img.image.length) ? img.image : img.url;				
					this.add(searchItems, img)					
				});	
			}
		});
		
		return searchItems;
  	}

	private extractImage(res: Response): Array<ImageObjectInfo> {
		
    	let body = res.json();
		let searchItems = new Array<ImageObjectInfo>();

		body.items.forEach(item => {
			const img: ImageObjectInfo = new ImageObjectInfo();
			img.src = item.link;
			img.title = item.title;
			this.add(searchItems, img)
		});

		return searchItems;
	}

	private add(searchItems: Array<ImageObjectInfo>, img: ImageObjectInfo) {

		if (!this.exists(searchItems, img)) {
			searchItems.push(img);
		}
	}

	private exists(searchItems: Array<ImageObjectInfo>, img: ImageObjectInfo) {

		if (searchItems.find(i => i.src == img.src)) {
			return true;
		} else {
			return false;
		}
	}
	
	private handleError(error: any): Promise<any> {

		console.error('[AnimalSearchService]: An error occurred', error);
		return Promise.reject(error.message || error);

	}
}
