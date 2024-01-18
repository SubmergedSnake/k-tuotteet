import { isAProduct } from '../../src/utils'
import { Product } from '../../../types/shared.types'
import inMemoryDB from '../../src/database'


describe('product routes', () => {

	beforeAll(async () => {
		await inMemoryDB.init()
	})

	test('GET /products returns a list of products', async () => {
		const response = await fetch('http://localhost:3001/products')
		const products = await response.json()
		expect(products.length).toBeGreaterThan(0)
		expect(isAProduct(products[0])).toBe(true)
	})

	test.only('GET /products/search with price range 5-10, brand = Fazer and name = puikula returns the expected products', async () => {
		const response = await fetch(
			'http://localhost:3001/products/search?minPrice=5&maxPrice=10&brand=fazer&name=puikula'
		)
		expect(response.status).toBe(200)
		const products = await response.json()
		expect(products).not.toBeNull()
	})

	// test('GET /products/6411401015090 returns the existing product by ean', async () => {
	//
	// 	const expectedProduct = {
	// 		ean: "6411401015090",
	// 		brand: "FAZER",
	// 		name: "Fazer maitosuklaalevy 200g",
	// 		price: "1.02",
	// 		category: "4210"
	// 	}
	//
	//
	// 	const response = await fetch('http://localhost:3001/products/6411401015090')
	// 	const product = await response.json()
	// 	expect(product).toEqual(expectedProduct)
	// })
	//
	// test('GET /products/:filter/:query returns all exact matches for brand=FAZER', async () => {
	// 	const response = await fetch('http://localhost:3001/products/brand/FAZER')
	// 	const fazerProducts: Product[] = await response.json()
	// 	expect(fazerProducts.every(product => product.brand === 'FAZER'))
	// })
	//
	// test('GET /products/:filter/:query returns all partial matches for name=lAktOosi', async () => {
	// 	const response = await fetch('http://localhost:3001/products/name/lAktOosi')
	// 	const fazerProducts: Product[] = await response.json()
	// 	expect(fazerProducts.every(product => product.name.toString().includes('laktoosi')))
	// })
	//
	// test('GET /products/:filter/:minPrice/:maxPrice returns all matches where price is within range 5-10', async () => {
	// 	const response = await fetch('http://localhost:3001/products/price/5/10')
	// 	const productsWithinPriceRange: Product[] = await response.json()
	// 	expect(productsWithinPriceRange.every(product => product.price >= 5 && product.price <= 10)).toBe(true)
	// })

	test('DELETE /products/:ean deletes the given product by ean', async () => {
		await fetch('http://localhost:3001/products/6408430000449', { method: "DELETE" })
		const deletedProduct = await fetch('http://localhost:3001/products/6408430000449')
		expect(await deletedProduct.json()).toBeNull()
	})
})

