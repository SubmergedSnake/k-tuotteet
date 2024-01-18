import express, { Express, Request, Response } from "express";
import inMemoryDB from '../database/db'

const router = express.Router()


router.get('/brands', (req: Request, res: Response) => {
	const brands = inMemoryDB.getAllBrands()
	res.json(brands)
})


export default router
