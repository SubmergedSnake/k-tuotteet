import { Product, QueryFilters } from "../../../../types/shared.types";

const queryFilters = {
	brand: (brand: string): (p: Product) => boolean => {
		let brandRegex = new RegExp(`${brand}`, 'gi');
		return (p: Product) => (p.brand.toString().match(brandRegex)?.length || 0) > 0
	},

	category: (category: string): ((p: Product) => boolean) => {
		let categoryRegex = new RegExp(`${category}`, 'gi');
		return (p: Product) => (p.category.toString().match(categoryRegex)?.length || 0) > 0
	},

	ean: (ean: string): ((p: Product) => boolean) => {
		let eanRegex = new RegExp(`${ean}`, 'gi');
		return (p: Product) => (p.ean.toString().match(eanRegex)?.length || 0) > 0
	},

	name: (name: string): ((p: Product) => boolean) => {
		let nameRegex = new RegExp(`${name}`, 'gi');
		return (p: Product) => (p.name.toString().match(nameRegex)?.length || 0) > 0
	},

	price: (minPrice: string, maxPrice: string): ((p: Product) => boolean) => {
		return (p: Product) => p.price >= parseFloat(minPrice) && p.price <= parseFloat(maxPrice)
	}
}

const applyQueryFilters = (query: QueryFilters, dataset: Product[]): Product[] => {
	let filteredProducts: Product[] = dataset
	const { name, brand, category, ean, minPrice, maxPrice } = query

	if (minPrice && maxPrice) {
		filteredProducts = dataset.filter(queryFilters.price(minPrice, maxPrice))
	}

	if (name) {
		filteredProducts = filteredProducts.filter(queryFilters.name(name))
	}

	if (brand) {
		filteredProducts = filteredProducts.filter(queryFilters.brand(brand))
	}

	if (category) {
		filteredProducts = filteredProducts.filter(queryFilters.category(category))
	}

	if (ean) {
		filteredProducts = filteredProducts.filter(queryFilters.ean(ean))
	}

	return filteredProducts
}

export default applyQueryFilters

