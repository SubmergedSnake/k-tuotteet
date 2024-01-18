
export const arrayValuesAreUnique = (array: []) => {
	return array.length === Array.from(new Set(array)).length
}

export const isAProduct = (object: any) => {
	const productKeys = ['ean', 'brand', 'name', 'price', 'category']
	return Object.keys(object).length === productKeys.length &&
		Object.keys(object).every(key => productKeys.includes(key))
}
