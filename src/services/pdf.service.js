import fs from 'fs'
import { PDFDocument } from 'pdf-lib'
import PDF from 'pdfkit'
import async from 'async'

export async function createPDF(data, filePath) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDF();
            const writeStream = fs.createWriteStream(filePath);

            doc.pipe(writeStream);

            doc.fontSize(20).text('Product Information', { align: 'center' });

            doc.moveDown();
            writeStream.on('finish', resolve);
            writeStream.on('error', reject)

            data.forEach(product => {
                doc.fontSize(10).text(product.id)
                doc.text(product.name)
                doc.text(product.description);
                doc.text(product.price);
                doc.text(product.created_at)
            })
            doc.end()
        } catch (err) {
            reject(err)
        }
    })
}

export async function getAllPdfFile(filePath) {
    let fileList = fs.readdirSync(filePath).filter(file => file.includes('.pdf'))
    console.log(fileList)
    return fileList
}

export async function mergePDF(path, pdfArry, outputPath) {
    return new Promise(async (resolve, reject) => {
        try {
            const mergePdf = await PDFDocument.create();
            async.each(pdfArry, async (file, cb) => {
                   const fileData = await PDFDocument.load(fs.readFileSync(`${path}/${file}`))
                   const copiedPage = await mergePdf.copyPages(fileData, fileData.getPageIndices())
                   copiedPage.forEach(page => {
                    mergePdf.addPage(page)
                   })
                   cb()
            }, async () => {
                fs.writeFileSync(`${path}/${outputPath}`, await mergePdf.save())
                resolve(outputPath)
            })
        } catch(err) {
            reject(err)
        }
    })
}