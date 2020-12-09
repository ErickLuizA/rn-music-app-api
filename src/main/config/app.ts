import dotenv from 'dotenv'
import express, { urlencoded, json } from 'express'
import cors from 'cors'
import setupRoutes from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

setupRoutes(app)

export default app
