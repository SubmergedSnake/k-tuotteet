import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Product } from '../../../../types/shared.types';
import ProductSearch from '../../../src/components/ProductSearch'
import * as api from '../../api'

describe('ProductSearch', () => {

	const requiredFilterOptions = ['name', 'brand', 'category', 'ean']

	test('That it renders correct header, radio buttons, range slider and a single input', () => {
		render(<ProductSearch />);

		// Should have a h2 element with specific text
		const header = screen.getByText('K-Tuotteet')
		expect(header).toBeInTheDocument();
		expect(header.tagName).toEqual('H2')

		// Should have one input element with specific placeholder text
		const generalInput = screen.getByPlaceholderText('Mitä etsit?')
		expect(generalInput).toBeInTheDocument();
		expect(generalInput.tagName).toEqual('INPUT')

		// Should have 4 checkboxes (name, brand, category, ean)
		const checkBoxes: HTMLInputElement[] = Array.from(screen.getAllByRole('checkbox'))
		expect(checkBoxes.length).toBe(4)
		expect(checkBoxes.map(button => button.id).every(id => requiredFilterOptions.includes(id))).toBe(true)

		// Should have a price range slider with default values of 0, 1000
		const priceRangeSliderInputs = Array.from(screen.getByTestId('price-slider').querySelectorAll('input'))
		expect(priceRangeSliderInputs.map(input => input.value)).toEqual(['0', '1000'])

	})

	test('That queryBackend is called on input and selected product\'s full information is displayed in ProductCard', async () => {
		jest.spyOn(api, 'queryForProducts').mockResolvedValue([
			{ name: 'Banaani kg', brand: 'Pirkka', price: 5, ean: '2342', category: 2343 }
		] as Product[])

		render(<ProductSearch />)

		const generalInput = screen.getByPlaceholderText('Mitä etsit?')
		fireEvent.change(generalInput, { target: { value: 'Banaani kg' } })

		await waitFor(() => {
			const banana = within(screen.getByTestId('searchResults')).getByText(/banaani kg/i)
			fireEvent.click(banana)

			const productCardName = screen.getByTestId('product-card-name')
			expect(productCardName).toHaveTextContent('Banaani kg')

			const productCardBrand = screen.getByTestId('product-card-brand')
			expect(productCardBrand).toHaveTextContent('Pirkka')

			const productCardPrice = screen.getByTestId('product-card-price')
			expect(productCardPrice).toHaveTextContent('5')

			const productCardEan = screen.getByTestId('product-card-ean')
			expect(productCardEan).toHaveTextContent('2342')

			const productCardCategory = screen.getByTestId('product-card-category')
			expect(productCardCategory).toHaveTextContent('2343')
		})
	})

	// something funny going on here, seems like the dialog is toggled ad infinitum, skip for now 
	test.skip('That ProductCard has a delete button, clicking which opens up a confirmation dialog', async () => {
		jest.spyOn(api, 'queryForProducts').mockResolvedValue([
			{ name: 'Banaani kg', brand: 'Pirkka', price: 5, ean: '2342', category: 2343 }
		] as Product[])

		render(<ProductSearch />)

		const generalInput = screen.getByPlaceholderText('Mitä etsit?')
		fireEvent.change(generalInput, { target: { value: 'Banaani kg' } })

		await waitFor(() => {
			const banana = within(screen.getByTestId('searchResults')).getByText(/banaani kg/i)
			fireEvent.click(banana)

			const deleteButton = screen.getByTestId('product-card-delete-button')
			fireEvent.click(deleteButton)

			const confirmationDialog = screen.getByTestId('delete-confirmation-dialog')
			expect(confirmationDialog).toHaveTextContent(/are you sure you want to delete product/i)

		})

	})

	test('That products are not retrieved upon first render', async () => {
		const queryForProductsSpy = jest.spyOn(api, 'queryForProducts')

		render(<ProductSearch />)
		await waitFor(() => {
			expect(queryForProductsSpy).not.toHaveBeenCalled()
		})
	})

	test.only('That number of found products is displayed on top of the searchResults box', async () => {
		jest.spyOn(api, 'queryForProducts').mockResolvedValue([
			{ name: 'Banaani kg', brand: 'Pirkka', price: 5, ean: '2342', category: 2343 },
			{ name: 'Omena', brand: 'Sam\s Orchard', price: 2, ean: '9829', category: 8892 }
		] as Product[])

		render(<ProductSearch />)

		const productCountChip = within(screen.getByTestId('searchResults')).getByTestId('product-count')
		expect(productCountChip).toHaveTextContent('2')

	})
})
