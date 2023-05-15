const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users/');
    },
    //To avoid duplicated file name, set file name is now date + original file name
    filename: (req, file, cb) => {
        cb(null , new Date().getTime() + file.originalname)
    },
})

var upload = multer({storage:storage})

module.exports = upload