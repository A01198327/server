const express = require("express");
const router  = express.Router();
const reportes = require("../services/reportes");

router.get('/', async function (req, res, next){
    try {
        res.json(await reportes.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;