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
    if (data.values.last_name !== undefined) {
        return client.query('INSERT INTO public."Registrations"(user_name, user_email, user_password, dob, otp) VALUES (' + '\'' + data.values.first_name + ' ' + data.values.last_name + '\' , \'' + data.values.user_email + '\',\'' + hash + '\' , \'' + data.values.dob + '\',' + otp + ');')
    }
    else {
        return client.query('INSERT INTO public."Registrations"(user_name, user_email, user_password, dob, otp) VALUES (' + '\'' + data.values.first_name + '\' , \'' + data.values.user_email + '\',\'' + hash + '\' , \'' + data.values.dob + '\',' + otp + ');')
    }
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

exports.addPost = function (id, name, content) {
    return client.query('INSERT INTO public."posts" (user_id, user_name , post_content) VALUES (' + parseInt(id) + ' , \'' + name + '\' , \' ' + content + '\');')
}

exports.forgetOtp = function (otp, email) {
    return client.query('SELECT * FROM public."Registrations" WHERE user_email =' + '\'' + email + '\' AND otp =' + parseInt(otp))
}

exports.changePass = function (email, pass) {
    return client.query('UPDATE public."Registrations" SET user_password= ' + '\'' + pass + '\' WHERE user_email = ' + '\'' + email + '\'')
}

exports.allPosts = function (id) {
    // return client.query('SELECT * From public."posts"')
    console.log(id);
    return client.query('SELECT public."posts".post_id,public."posts".user_id,public."posts".user_name,public."posts".post_content,public."posts".likes,public."posts".timestamp FROM public."posts" INNER JOIN public."Registrations" ON public."posts".user_id = public."Registrations".user_id OR public."posts".user_id = ANY (public."Registrations".friends) WHERE public."Registrations".user_id=' + parseInt(id))
}


exports.likePost = function(id) {
    console.log(id);
    return client.query('UPDATE public."posts" SET likes = likes+1 WHERE post_id = ' + parseInt(id) )
}

exports.dislikePost = function(id) {
    return client.query('UPDATE public."posts" SET likes=likes-1 WHERE post_id = ' + parseInt(id) )
}