import { Product } from '../types/shared.types'
import csv from "csvtojson";

const getInitialProducts = async () => {
	const allProducts = await csv().fromFile('./data.csv')
	return allProducts
}



export default getInitialProducts
