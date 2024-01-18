import axios from 'axios';
import { QueryFilters } from '../../types/shared.types';

export const searchDBForProducts = async (query: QueryFilters) => {
  const response = await axios.get('http://localhost:3001/products/search', { params: query })
  return response.data
}

export const deleteProductByEan = async (ean: string) => {
  const response = await axios.delete(`http://localhost:3001/products/delete/${ean}`)
  return response.data
}
