const { Client } = require('pg');
const client = new Client({
    user: 'ayush',
    host: 'localhost',
    database: 'postgres',
    password: 'Ayush2609',
    port: 5432,
})

client.connect().then(() => {
    console.log("Connected");
}
)
exports.checkUser = function (email, password) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_email =' + '\'' + email + '\' AND user_password = ' + '\'' + password + '\'')
}

exports.findID = function (id) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_id = ' + parseInt(id))
}

exports.registerUser = function (data, otp, hash) {
    return client.query('INSERT INTO public."Registrations"(user_name, user_email, user_password, dob, otp) VALUES (' + '\'' + data.values.first_name + data.values.last_name + '\' , \'' + data.values.user_email + '\',\'' + hash + '\' , \'' + data.values.dob + '\',' + otp + ');')
}

exports.updateStatus = function (email) {
    return client.query('UPDATE public."Registrations" SET otp = ' + null + ', email_verified_status = ' + true + ' WHERE user_email = ' + '\'' + email + '\'')
}

exports.findEmail = function (email) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_email =' + '\'' + email + '\'')
}

exports.statusverify = function (email) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_email =' + '\'' + email + '\' AND email_verified_status = ' + true)
}

exports.verifyUser = function (otp, email) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_email =' + '\'' + email + '\' AND otp = ' + parseInt(otp))
}

exports.forgetAdd = function (data, otp) {
    return client.query('UPDATE public."Registrations" SET otp = ' + otp + ' WHERE user_email = ' + '\'' + data + '\' ')
}

// exports.forgetAdd = function (data, otp) {
//     return client.query('UPDATE public."Registrations" SET otp = ' + otp + ' WHERE user_email = ' + '\'' + data + '\' AND email_verified_status = ' + true )
// }

exports.forgetOtp = function (otp, email) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_email =' + '\'' + email + '\' AND otp =' + parseInt(otp))
}

exports.changePass = function (email, pass) {
    return client.query('UPDATE public."Registrations" SET user_password= ' + '\'' + pass + '\' WHERE user_email = ' + '\'' + email + '\'')
}