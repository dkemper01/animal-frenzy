export class Flatten {
	
	/**
	* An ES6 iterative flattening method that leverages a rest parameter.  Note that
	* any ES5 implementation is pretty much doomed to be recursive and hence subject
	* to stack overflow for very deeply nested arrays.
	* @param {Array} list
	*/
	public iterativeFlatten(list: any[]): any[] {
		
		for (let i = 0; i < list.length; i++) {
			while (true) {
					if (Array.isArray(list[i])) {
						list.splice(i, 1, ...list[i]); 
					} else {
						break;
					}
			}
  	}
		
  	return list;
	}
	
	/**
	An ES5 recursive flattening maethod, subject to stack overflow if arrays are nested too deep.
	@param {Array} list
	@param {Array} result
	*/
	public recursiveFlatten(list: any[], result?: any[]): any[] {

		let length = list.length;
		let index = -1;

		result || (result = []);

		while (++index < length) {
			let value = list[index];
			if (Array.isArray(value)) {
				this.recursiveFlatten(value, result);	
			} else {
				result.push(value);
			}
		}

	 return result;
	}
}