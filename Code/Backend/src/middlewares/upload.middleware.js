const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,  // file size bytes me hoti hai isme 1 mb = 1024 * 1024 bytes hai, isse jyada ki file user upload nhi kr payega.
    }
});

module.exports = upload;