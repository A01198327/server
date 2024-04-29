const config = require("../config")
const helper = require("../helper")
const database = require("./database");

async function setStatus(IdReporte, status){
    const rows = await database.query(`UPDATE Reporte SET Estatus = '${status}' WHERE IdReporte = ${IdReporte}`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

module.exports = {setStatus};
