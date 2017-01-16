import { PageMap } from './pageMap';

export class ItemInfo {
	public pageMap: PageMap;
	public title: string;
	
	constructor(pagemap: PageMap, title: string) {
		this.pageMap = pagemap;
		this.title = title;
	}
}

export class Items
{
	public items: Array<ItemInfo>;
}