const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());



// database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'academia2022'
});

// check database connection
db.connect(err => {
    if(err){
        console.log(err, ' ---- db error');
    }
    console.log('db conectada')
});


// get data
app.get('/users', (req, res) => {

    db.query(`SELECT * FROM users`, (err, result) => {
        if(err){
            console.log(err, ' ERROR!!!!');
        }

        if(result.length){
            res.send({
                message: 'all users data',
                data: result
            });
        }
    });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
        if(err){
            console.log(err, ' ERROR!!!!');
        }

        if(result.length){
            res.send({
                message: 'user data',
                data: result
            });
        }
    });
});



// create data
app.post('/users', (req, res) => {

    const u_name = req.body.name;
    const last_name = req.body.last_name;
    const alias = req.body.alias;
    const email = req.body.email;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const password = req.body.password;

    const query = `INSERT INTO users(name, last_name, alias, email, gender, phone, password) 
    values('${u_name}','${last_name}','${alias}','${email}','${gender}','${phone}','${password}')`;

    db.query(query, (err, result) => {
        if(err){
            console.log('ERROR AL INSERTAR DATA. ', err);
        }
        console.log(result);
        res.send({
            message: 'data inserted!!!'
        });

    });
});


// update single data
app.put('/users/:id', (req, res) => {

    const id = req.params.id;

    console.log(req.body, 'updated data');

    const u_name = req.body.name;
    const last_name = req.body.last_name;
    const alias = req.body.alias;
    const email = req.body.email;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const password = req.body.password;

    const query = `UPDATE users SET name = '${u_name}', last_name = '${last_name}', alias = '${alias}', email = '${email}', 
    gender = '${gender}', phone = '${phone}', password = '${password}' WHERE id = ${id}`;

    db.query(query, (err, result) => {

        if(err){
            console.log('ERROR UPDATE', err);
        }

        res.send({
            message: 'data updated'
        });
    });

});

// delete data
app.delete('/users/:id', (req, res) => {

    const id = req.params.id;

    db.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
        
        if(err){
            console.log('ERROR DELETE', err);
        }

        res.send({
            message: 'data updated'
        });
  
    });


});




app.listen(3000, () => {
    console.log('server running!');
});