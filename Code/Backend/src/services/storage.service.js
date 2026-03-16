/*
  ab hme file imagekit pr upload krni hai and ye image kit ek 3rd party serice hai toh hm services folder me ek file bna kr iska code likhenge, kyuki thirdd party services ka code service folder me rhta hai.
  
  */

const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile({buffer, fileName, folder=""}) {
    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder
    })

    return file;
}



module.exports = { uploadFile 
}