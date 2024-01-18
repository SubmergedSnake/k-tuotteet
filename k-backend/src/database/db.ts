import { Product, QueryFilters } from "../../../types/shared.types"
import initializeProducts from '../../fixtures'
import applyQueryFilters from "./query-filtering/filters"


let allProducts: Product[] = []

const inMemoryDB = {

	init: async () => {
		allProducts = await initializeProducts()
	},
	getAllProducts: () => {
		return allProducts
	},
	getProductByEan: (ean: string) => {
		return allProducts.find(product => product.ean === ean) || null
	},
	deleteProductByEan: (ean: string) => {
		allProducts = allProducts.filter(product => product.ean !== ean)
		return true
	},
	findProducts: (query: QueryFilters): Product[] | null => {
		const filteredProducts = applyQueryFilters(query, allProducts)
		return filteredProducts
	},
	getAllBrands: () => {
		return Array.from(new Set([...allProducts.map(product => product.brand)]))
	}
}

export default inMemoryDB
