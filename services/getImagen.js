const config = require("../config")
const helper = require("../helper")
const database = require("./database");

async function getImagenById(idReporte){
    const rows = await database.query(`
        SELECT Imagen.direccionImagen
        FROM Reporte
        INNER JOIN Imagen ON Reporte.idImagen = Imagen.idImagen
        WHERE Reporte.idReporte = '${idReporte}';`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

module.exports = {getImagenById};