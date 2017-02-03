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
	
	constructor(private http: Http) { }
	
	public getItems(terms: string): Promise<Array<ImageObjectInfo>> {
		
		const cx = '017399694708952684169%3Ai75sqt8j8ko';
		const apiKey = 'AIzaSyAvn8SAwatK2SnhTPtY29T02LisZ7JSI78';
		const safetyLevel = 'high';
		const queryParams = `q=${terms}&cx=${cx}&key=${apiKey}&safe=${safetyLevel}`;
		const searchUrl = 'https://www.googleapis.com/customsearch/v1?';
		
		// The Angular http.get returns an RxJS Observable.  We convert it to a promise.  
		// 
    return this.http.get(searchUrl + queryParams)
										.toPromise()
										// In the promise's `then` callback we call the json method of the HTTP Response 
										// to extract the data within the response.
										//
										.then(response => this.extractData(response))
										.catch(this.handleError);
	}
	
	public getItemsAsync(terms: string): Observable<Array<ImageObjectInfo>> {
		
		const cx = '017399694708952684169%3Ai75sqt8j8ko';
		const apiKey = 'AIzaSyAvn8SAwatK2SnhTPtY29T02LisZ7JSI78';
		const safetyLevel = 'high';
		const queryParams = `q=${terms}&cx=${cx}&key=${apiKey}&safe=${safetyLevel}`;
		const searchUrl = 'https://www.googleapis.com/customsearch/v1?';
		
		// The Angular http.get returns an RxJS Observable.
		// 
    return this.http.get(searchUrl + queryParams)
										.map(response => this.extractData(response));
	}
	
	private extractData(res: Response): Array<ImageObjectInfo> {
		
    let body = res.json();
		let searchItems = new Array<ImageObjectInfo>();
	
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
					searchItems.push(img);
				}
			} 

			if (cseImage && (cseImage.length > 0)) {
				const img: ImageObjectInfo = new ImageObjectInfo();
				img.src = (cseImage.pop())["src"];
				img.title = title;
				searchItems.push(img);			
			} else if (topImageObject) {		
				topImageObject.forEach(img => {
					img.title = title;					
					img.src = (img.src && img.src.length) ? img.src : (img.contenturl && img.contenturl.length) ? img.contenturl : (img.image && img.image.length) ? img.image : img.url;				
					if (img.src) {
						searchItems.push(img);
					}					
				});	
			}
		});
		
		return searchItems;
  }
	
	private handleError(error: any): Promise<any> {

		console.error('An error occurred', error);
		return Promise.reject(error.message || error);

	}
}
