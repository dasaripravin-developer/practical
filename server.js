import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { productRouter } from './src/routes/product.routes.js';

const app = express();
app.use(bodyParser.json())
app.use('/products', productRouter)
    app.listen(3000, () => {
        console.log('server started')
    })