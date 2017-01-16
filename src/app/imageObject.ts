
/**
 This type supports results of a GET request from this URL:
 https://www.googleapis.com/customsearch/v1?q=lemurs+of+madagascar&cx=017399694708952684169%3Ai75sqt8j8ko&key={YOUR_API_KEY}
 where {YOUR_API_KEY} is AIzaSyAvn8SAwatK2SnhTPtY29T02LisZ7JSI78
*/
export class ImageObjectInfo {
	
	contenturl: string;
	url: string;
	image: string;
	src: string;
	description: string;
	datePublished: Date;
	title: string;
	width: number;
	height: number;
	
constructor(contenturl?: string, url?: string, image?: string, src?: string, datepublished?: Date, description?: string, width?: number, height?: number) {
		this.contenturl = contenturl;
		this.description = description;
		this.datePublished = datepublished;
		this.image = image;
		this.src = src;
		this.url = url;
		this.width = width;
		this.height = height;
	}	
}

export class ImageObject
{
	public imageObject: Array<ImageObjectInfo>;
}
