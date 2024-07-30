import { Router } from "express";
import { deleteProduct, getProducts, getProductsById, insertProduct, updateProduct } from "../services/products.service.js";
import {insertProductValidate} from '../middleware/products.middleware.js'
import {createPDF, getAllPdfFile, mergePDF} from '../services/pdf.service.js'
import { sendMailWithAttachement} from '../services/mail.service.js'

const productRouter = Router()

productRouter.post('/', insertProductValidate, async (request, response) => {
    try {
        request.body.created_at = new Date().toJSON()
        const result = await insertProduct(request.body)
        console.log('result in hander => ', result)
        if(result)
            response.status(201).json(result);
        else
            response.status(500).json({message: "something went wrong"})
    } catch(err) {
        console.log(`excpetion in post product - ${err}`)
        response.status(500).json({message: "something went wrong"})
    }
})

productRouter.get('/', async (request, response) => {
    try {
        const result = await getProducts();
        console.log('result ==> ', result)
        if(result)
            response.status(201).json(result.recordsets.flat());
        else
            response.status(500).json({message: "something went wrong"})
    } catch(err) {
        console.log(`excpetion in post product - ${err}`)
        response.status(500).json({message: "something went wrong"})
    }
})

productRouter.put('/:id', insertProductValidate, async (request, response) => {
    try {
        request.body.created_at = new Date().toJSON()
        const result = await updateProduct(parseInt(request.params.id), request.body);
        console.log('result ==> ', result)
        if(result)
            response.status(201).json(result);
        else
            response.status(500).json({message: "something went wrong"})
    } catch(err) {
        console.log(`excpetion in post product - ${err}`)
        response.status(500).json({message: "something went wrong"})
    }
})

productRouter.delete('/:id', async (request, response) => {
    try {
        const result = await deleteProduct(parseInt(request.params.id))
        console.log('result ==> ', result)
        if(result)
            response.status(201).json(result);
        else
            response.status(500).json({message: "something went wrong"})
    } catch(err) {
        console.log(`excpetion in post product - ${err}`)
        response.status(500).json({message: "something went wrong"})
    }
})

productRouter.post('/:id/pdf', async (request, response) => {
    try {
        const result = await getProductsById(parseInt(request.params.id))
        if(result) {
            const fileName = `product-${new Date().getTime()}.pdf`
            const filePath = `./${fileName}`
            await createPDF(result.recordsets.flat(), filePath)
            response.status(200).json({message: `pdf file generated for ${request.params.id} product`, fileName})
        } else
            response.status(500).json({message: "something went wrong"})
    } catch(err) {
        console.log(`excpetion in post product - ${err}`)
        response.status(500).json({message: "something went wrong"})
    }
})

productRouter.post('/:id/email', async (request, response) => {
    try {
        const result = await getProductsById(parseInt(request.params.id))
        console.log('result ==> ', result)
        if(result) {
            const fileName = `product-${new Date().getTime()}.pdf`
            const filePath = `./${fileName}`
            await createPDF(result.recordsets.flat(), filePath)
            await sendMailWithAttachement({
                to: 'dasaripravin123@yahoo.com',
                subject: 'product detail',
                body: 'PFA',
                filePath
            })
            response.status(200).send('mail sent')
        } else
            response.status(500).json({message: "something went wrong"})
    } catch(err) {
        console.log(`excpetion in post product - ${err}`)
        response.status(500).json({message: "something went wrong"})
    }
})

productRouter.get('/allpdf', async (request, response) => {
    try {
        const fileList = await getAllPdfFile('./');
        if(fileList && fileList.length > 0)
            response.send(fileList)
        else
            response.status(200).send('pdf files not present')
    } catch(err) {
        response.status(500).send('something went wrong')
    }
})

productRouter.post('/pdf/merge', async (request, response) => {
    try {
        const fileName = `mergeFile-${new Date().getTime()}.pdf`
        await mergePDF('./', request.body.fileList, `${fileName}`)        
        response.status(200).send('file merged ' + fileName)
    } catch(err) {
        console.log(err)
        response.status(500).send('something went wrong')
    }
})



export {productRouter}