const mysql =require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'peliculadb3.c30hugurymyv.us-east-1.rds.amazonaws.com',
    user: 'sudosu',
    password : 'laboratorio26',
    database: 'peliculadb'
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB conexion con la base exitosa.');
    else   
        console.log('DB fallo la conexion \n Error: ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000,()=>console.log('Express server is running at port no : 30000'));


//GET peliculas
app.get('/peliculas',(req,res)=>{
    mysqlConnection.query('SELECT * FROM pelicula', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//GET pelicula
app.get('/peliculas/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM pelicula WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//borrar pelicula
app.delete('/peliculas/:id',(req,res)=>{
    mysqlConnection.query('DELETE pelicula WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Pelicula borrada ');
        else
        console.log(err);
    })
});

//Insertar pelicula
app.post('/peliculas',(req,res)=>{
    let pelicula = req.body;
    var sql = "SET @id = ?; SET  @nombre = ?; SET @genero = ?; \
    CALL peliculaAddOrEdit(@id, @nombre, @genero);";
    mysqlConnection.query(sql, [pelicula.id, pelicula.nombre, pelicula.genero],[req.params.id],(err, rows, fields)=>{
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Se insertó la pelicula: ' + element[0].id);
            });
        else
            console.log(err);
    })
});


//actualizar pelicula
app.put('/peliculas',(req,res)=>{
    let pelicula = req.body;
    var sql = "SET @id = ?; SET  @nombre = ?; SET @genero = ?; \
    CALL peliculaAddOrEdit(@id, @nombre, @genero);";
    mysqlConnection.query(sql, [pelicula.id, pelicula.nombre, pelicula.genero],[req.params.id],(err, rows, fields)=>{
        if(!err)
            res.send("Se actualizó correctamente");
        else
            console.log(err);
    })
});
