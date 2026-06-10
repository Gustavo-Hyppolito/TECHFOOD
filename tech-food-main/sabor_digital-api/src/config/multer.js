const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const nomeArquivo =
        Date.now() +
        "-" +
        file.originalname.replace(/\s+/g, "-");

        cb(null, nomeArquivo);
    }
    });

    const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const tiposPermitidos = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp"
        ];

        if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
        } else {
        cb(new Error("Apenas imagens são permitidas"));
        }
    }
});

module.exports = upload;