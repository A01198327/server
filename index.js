const express = require("express");
const app = express(); 
//const database = require("./services/database");
const path = require("path");
const https = require('https');
const fs = require('fs');
const port = 5500;
const reportesRouter = require("./routes/reportes");
const reportesPostRouter = require("./routes/insertReportes");
const reportesMaxRouter = require("./routes/getMax");
const reportesUsuarioRouter = require("./routes/reportesUsuario");
const loginRouter = require("./routes/loginUsuario");
const empleadosRouter = require("./routes/getEmpleados");
const empleadoByIdRouter = require("./routes/getEmpleadoById");
const insertImageRotuer = require("./routes/insertImage")
const getImagenRouter = require("./routes/getImagen");
const statusRouter = require("./routes/setStatus");
const cors = require('cors');


app.use((req, res, next) => {
    if (req.originalUrl.endsWith('.br')) {
        res.set('Content-Encoding', 'br');
    }
    next();
});

app.get('/file/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'Build', `${fileName}.br`);
    
    try {
        const compressedData = fs.readFileSync(filePath);
        res.send(compressedData);
    } catch (error) {
        console.error(`Error serving file '${fileName}':`, error);
        res.status(500).send(`Error serving file '${fileName}'`);
    }
});

  


app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/game', express.static(__dirname + '/game'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
})
);

app.use(cors());
app.use("/reportes", reportesRouter);
app.use("/insertReporte", reportesPostRouter);
app.use("/getMax", reportesMaxRouter);
app.use("/reportesUsuario", reportesUsuarioRouter);
app.use("/login", loginRouter);
app.use("/getEmpleados", empleadosRouter);
app.use("/getEmpleadoById", empleadoByIdRouter);
app.use("/getImagenByReporteId", getImagenRouter);
app.use("/insertImage", insertImageRotuer);
app.use("/setStatus", statusRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

/*
app.get('/api', async (req, res) => {
    const records = await database.getReportes();
    res.json({ message: `hola desde el server, ${records[0].Estatus}`});
});
*/

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);


{/*httpServer.listen(port, () => {
    console.log(`HTTP Server running at port ${port}`);
});*/}

const server = app.listen(port, function(){
    console.log(`Server running at port ${port}`);
});