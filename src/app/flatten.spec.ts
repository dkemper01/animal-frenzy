import { Flatten } from './flatten'

describe('Flatten', () => {
	
	const flatten = new Flatten();
	
	it('should perform no-op on already flattened list', () => {
		
		let variantList: Array<any> = [1, 2, "a", "b", { "a": "A", "b": "B" }];
		let intList: Array<Number> = [1, 2, 3, 4, 5];
		let stringList: Array<String> = ["a", "b", "c", "d" ];
		
		let flattenResult = flatten.iterativeFlatten(variantList);
		expect(flattenResult).toEqual(variantList);
		flattenResult = flatten.recursiveFlatten(variantList);
		expect(flattenResult).toEqual(variantList);
		
	  flattenResult = flatten.iterativeFlatten(intList);
		expect(flattenResult).toEqual(intList);
		flattenResult = flatten.recursiveFlatten(intList);
		expect(flattenResult).toEqual(intList);
		
		flattenResult = flatten.iterativeFlatten(stringList);
		expect(flattenResult).toEqual(stringList);
		flattenResult = flatten.recursiveFlatten(stringList);
		expect(flattenResult).toEqual(stringList);
	});
	
	it('should flatten a nested list', () => {
		
		let variantList: Array<any> = [1, 2, [2, 3, 4, [4, 5]], "a", "b", ["b", "c", "d", ["d", "e"]], { "a": "A", "b": "B" }, [{"c": "C"}]];
		let intList: Array<any> = [ 1, 2, 3, [3, 4, 5, [4, 5]], 4, 5 ];
		let stringList: Array<any> = [ "a", "b", [ "c", "d", ["e", "f"] ], "c", "d" ];
		
		let flattenResult = flatten.iterativeFlatten(variantList);
		expect(flattenResult.length).toBe(16);
		flattenResult = flatten.recursiveFlatten(variantList);
		expect(flattenResult.length).toBe(16);
		
	  flattenResult = flatten.iterativeFlatten(intList);
		expect(flattenResult.length).toBe(10);
		flattenResult = flatten.recursiveFlatten(intList);
		expect(flattenResult.length).toBe(10);
		
		flattenResult = flatten.iterativeFlatten(stringList);
		expect(flattenResult.length).toBe(8);
		flattenResult = flatten.recursiveFlatten(stringList);
		expect(flattenResult.length).toBe(8);
	});
});