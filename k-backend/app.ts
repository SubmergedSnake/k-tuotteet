import express, { Express, Request, Response } from "express";
import productRouter from './src/routes/product-routes'
import brandRouter from './src/routes/brand-routes'
import cors from 'cors'
import inMemoryDB from './src/database/db'

const app: Express = express();
const port = 3001

inMemoryDB.init()

app.use(cors())

app.use(productRouter)
app.use(brandRouter)
app.use(express.json())
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
