import express, { Express, Request, Response } from "express";
import inMemoryDB from './../database/db'

const router = express.Router()

router.get('/products', async (req: Request, res: Response) => {
	const products = inMemoryDB.getAllProducts()
	res.json(products)
})

router.get('/products/search', (req: Request, res: Response) => {
	const products = inMemoryDB.findProducts(req.query)
	if (!products) {
		res.status(404).send()
	} else {
		res.json(products)
	}
})

router.delete('/products/delete/:ean', (req: Request, res: Response) => {
	try {
		inMemoryDB.deleteProductByEan(req.params.ean)
		res.sendStatus(200)
	} catch (e) {
		res.status(500).send()
	}
})


export default router
