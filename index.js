import express from 'express'
import { config } from 'dotenv'
import { ConnectDB } from './configurations/dbConnection.js'
import { userRouter } from './view/user/userRoute.js'
import { blogRouter } from './view/blog/blogRoute.js'
import cors from 'cors'
config()

ConnectDB()

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/blogs', blogRouter)

app.listen(PORT, () => {
    console.log('App is running on ' + PORT)
})
