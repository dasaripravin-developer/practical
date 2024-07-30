import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

const mailTranport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "dasaripravin1@gmail.com",
        pass: "yqor vtbr hjqs esgy"
    }
})

export async function sendMailWithAttachement(data) {
    return new Promise(async (resolve, reject) => {
        try {

            const mailOption = {
            from: "dasaripravin1@gmail.com",
            to: data.to,
            subject: data.subject,
            text: data.body,
            attachments: [
                {
                    filename: path.basename(data.filePath),
                    path: data.filePath
                }
            ]
        }
        
        await mailTranport.sendMail(mailOption)
        console.log('mail send')
        fs.unlink(data.filePath, (err) => {
            if(err)
                console.log('file not deleted')
            else
                console.log('file delted')
        })
        resolve()
    } catch(err) {
        reject(err)
    }
        
    })
}