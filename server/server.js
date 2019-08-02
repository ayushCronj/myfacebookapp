var express = require('express')
var cors = require('cors')
// var auth = require("./auth.js")();
// var passport = require('passport');
// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;

var app = express()

app.use(cors())
app.use(express.json())
// app.use(auth.initialize());


// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'whisperers';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     console.log(jwt_payload);
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));

require("./routes/routes")(app)
app.listen(3002)
