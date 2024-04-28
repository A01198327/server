const express = require("express");
const router = express.Router();
const imagenes = require("../services/getImagen");

router.get('/', async function (req, res, next){
    try {
        const { IdReporte } = req.query;
        if (!IdReporte) {
            return res.status(400).json({ error: 'Se requiere el ID del reporte' });
        }
        const result = await imagenes.getImagenById(IdReporte);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;
