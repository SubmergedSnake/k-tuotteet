import applyQueryFilters from "../../../src/database/query-filtering/filters"
import { productArray } from '../../test-fixtures'
describe('applyQueryFilters', () => {

	test('should return only products where brand contains fazer', () => {
		const query = { brand: 'fazer' }
		const filteredProducts = applyQueryFilters(query, productArray)
		expect(filteredProducts).toHaveLength(2)
		expect(filteredProducts.every(product => product.brand.match(/fazer/i))).toBe(true)
	})

	test('should return all products where name contains suklaa', () => {
		const query = { name: 'suklaa' }
		const filteredProducts = applyQueryFilters(query, productArray)
		expect(filteredProducts).toHaveLength(2)
		expect(filteredProducts.every(product => product.name.match(/suklaa/i))).toBe(true)
	})

	test('should return all products where ean contains 1234', () => {
		const query = { ean: '1234' }
		const filteredProducts = applyQueryFilters(query, productArray)
		expect(filteredProducts).toHaveLength(2)
		expect(filteredProducts.every(product => product.ean.match(/1234/i))).toBe(true)
	})

	test('should return all products where category contains 342', () => {
		const query = { category: '342' }
		const filteredProducts = applyQueryFilters(query, productArray)
		expect(filteredProducts).toHaveLength(2)
		expect(filteredProducts.every(product => product.category.toString().match(/342/i))).toBe(true)
	})

	test('should return all products within price range 5-10', () => {
		const query = { minPrice: '5', maxPrice: '10' }
		const filteredProducts = applyQueryFilters(query, productArray)
		expect(filteredProducts).toHaveLength(2)
		expect(filteredProducts.every(product => product.price <= 10 && product.price >= 5)).toBe(true)
	})

	test.only('should return products with name = banaani and brand = pirkka', () => {
		const query = { name: 'banaani', brand: 'Pirkka' }
		const filteredProducts = applyQueryFilters(query, productArray)
		expect(filteredProducts).toHaveLength(2)
		expect(filteredProducts.every(
			product => product.name.toLowerCase().includes('banaani') &&
				product.brand.toLowerCase().includes('pirkka')))
			.toBe(true)
	})


})
