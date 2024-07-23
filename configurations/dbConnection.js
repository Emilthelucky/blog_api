import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const ConnectDB = () => {
    mongoose
        .connect(process.env.DB_URI, {
            dbName: 'blog',
        })
        .then(() => {
            console.log('Connected to DB')
        })
        .catch((err) => {
            console.log('DATABASE ERROR')
        })
}

export { ConnectDB }
