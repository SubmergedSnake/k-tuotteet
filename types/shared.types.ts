export type Product = {
	ean: string;
	brand: string;
	name: string;
	price: number;
	category: number;
}

export type QueryFilters = {
	name?: string;
	brand?: string;
	category?: string;
	ean?: string;
	minPrice?: string;
	maxPrice?: string;
}
