const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3008
const { Client } = require('pg');
const Sequelize = require('sequelize')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
// const sequelize = new Sequelize('public://ayush:pass@example.com:5432/postgres');
const sequelize = new Sequelize('postgres', 'ayush', 'Ayush2609', {
    dialect: 'postgres',
    host: 'localhost'
});

sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const registration = sequelize.define('Registration', {
    registration_id: {
        type: Sequelize.INTEGER,
        allowNull: false, unique: true,
        primaryKey: true, autoIncrement:
            true},
    user_name: { type: Sequelize.STRING },
    email_status: { type: Sequelize.BOOLEAN },
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    user_password: { type: Sequelize.STRING },
    dob : {type: Sequelize.DATE},
}, 
    { timestamps: false}, 
    { freezeTableName: true },
);

//sequelize sync
registration.sync()

app.post('/api/users/register', (request, response) => {
    response.send(request.body);

    //RAW Query Sequelize

    // sequelize.query('SELECT * FROM public."Registration"', { type: sequelize.QueryTypes.SELECT })
    //     .then(users => {

    //         response.send(users);
    //     })

    //Sequelize querying
    // await registration.create({
    //     User_name: 'Ayush',
    //     email_status: false
    // }).then(result => {
    //     console.log("Auto-generated ID:", result.User_id);
    // });

    // registration.findAll().then(users => {
    //     response.send(users)
    // })


    //postgres SQL 
    // const client = new Client({
    //     user: 'ayush',
    //     host: 'localhost',
    //     database: 'postgres',
    //     password: 'Ayush2609',
    //     port: 5432,
    // })
    // client.connect().then(() => {
    //     console.log("Connected");
    // }
    // )
    // client.query('INSERT INTO public."Registration"("User_name", email_status) VALUES (\'Ayush Goel\', false);', (err, res) => {
    //     console.log("Updated");
    // })
    // client.query('SELECT * FROM public."Registration"', (err, res) => {
    //     response.send(res.rows);
    // })

})

app.listen(port)
