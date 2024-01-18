import { arrayValuesAreUnique } from '../../src/utils'

describe('brand routes', () => {

	test('GET /brands returns all unique brands', async () => {
		const response = await fetch('http://localhost:3001/brands')
		const brands = await response.json()
		expect(arrayValuesAreUnique(brands)).toBe(true)
	})

})

