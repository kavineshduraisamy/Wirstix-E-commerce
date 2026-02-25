import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload an image' });
    }

    const base64Image = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

    res.send({
        message: 'Image Uploaded to Database',
        image: dataUri,
    });
});

export default router;
