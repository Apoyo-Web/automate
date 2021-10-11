const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')

const storageMemory = multer.memoryStorage()
const  upload = multer({storage: storageMemory})
const app = express()
const port = 3000

app.use(express.json())


app.post('/image', upload.single('imagen'), async(req, res) => {

    const nameFile = req.file.originalname
    const imageBuffer = req.file.buffer
  
    const imageResize = await sharp(imageBuffer).resize(200, 200, { fit: 'contain', background: '#FFF' }).toBuffer()
    
 
    
    fs.writeFileSync(`uploads/${nameFile}`, imageResize)

    res.status(200).send('Image resize')
    
})


app.listen(port, () => {
    
    console.log(`Servidor UP. Por:${port}`)
})