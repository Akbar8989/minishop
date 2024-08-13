import { config } from 'dotenv'
import cors from 'cors'
config()
import express from 'express'
import auth from './modules/auth/auth-router.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', auth)

app.listen(PORT, () => console.log(`Server is running on host: http://localhost:${PORT}`))