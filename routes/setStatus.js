const express = require("express");
const router = express.Router();
const status = require("../services/status");

router.get('/', async function (req, res, next){
    try {
        const { IdReporte, Estatus } = req.query;
        if (!IdReporte) {
            return res.status(400).json({ error: 'Se requiere el ID del reporte' });
        }
        const result = await status.setStatus(IdReporte, Estatus);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;
