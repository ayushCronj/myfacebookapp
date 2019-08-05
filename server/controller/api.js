const services = require('../services/services');
var nodemailer = require('nodemailer');
let jwt = require('jsonwebtoken');
let config = require('../config');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var bcrypt = require('bcryptjs');
const saltRounds = 10;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayush@cronj.com',
        pass: 'Ayush2609'
    }
});

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'whisperers';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);
    services.findID(jwt_payload.id).then((result) => {
        // console.log(result.rows[0]);
            if(result.rowCount === 1) {
                return done(null, result.rows[0])
            }
            else {
                return done(null,false)
            }
    }).catch((err)=> {
        return done(err,false)
    })
})
)

exports.homepage = function (req,res) {
    res.send("hi");
}


//register user
exports.registerUser = function (req, res) {
    let otp = Math.floor((Math.random() * 9000) + 1000)
    const mailOptions = {
        from: 'ayush@cronj.com',
        to: req.body.values.user_email,
        subject: 'My facebook App Registration OTP',
        html: '<p>Your OTP is : ' + otp + '</p>'
    };
    services.findEmail(req.body.values.user_email).then((result) => {
        if (result.rowCount === 0) {
            bcrypt.hash(req.body.values.user_password, saltRounds).then(function (hash) {
                services.registerUser(req.body, otp, hash).then((result) => {
                    if (result.rowCount === 1) {
                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err)
                                res.status(500).send(err)
                        });
                        res.send("Added")
                    }
                })
            })
        }
        else {
            res.send("Email Already exists");
        }
    }).catch((err) => res.status(500).send(err));
}

//loginUser
exports.loginUser = function (req, res) {
    let password = null;
    services.findEmail(req.params.email).then((result) => {
        if (result.rowCount === 0) {
            res.status(404).send("Email does not exist..!!");
        } else {
            password = result.rows[0].user_password;
            bcrypt.compare(req.params.password, password, function (err, res1) {
                if (res1) {
                    services.statusverify(req.params.email).then((result) => {
                        if (result.rowCount === 0) {
                            res.json({
                                message: "redirect OTP"
                            });
                        } else {
                            console.log(result.rows[0].user_id)
                            var payload = {
                                id: result.rows[0].user_id
                            };
                            const token = jwt.sign(payload, config.jwtSecret);
                            console.log(token);
                            res.json({
                                token: token,
                                message: "Redirect Home"
                            });
                        }
                    }).catch((err) => res.status(500).send(err))
                } else {
                    res.status(404).send("Email and Password does not match");
                }
            });
        }
    }).catch((err) => res.status(500).send(err))
}

//verifyUser
exports.verifyUser = function (req, res) {
    services.verifyUser(req.params.otp, req.params.email).then((result) => {
        if (result.rowCount === 0) {
            res.status(404).send("Incorrect OTP");
        }
        else {
            services.updateStatus(req.params.email).then((result) => {
                var payload = {
                    id: result.rows[0].user_id
                };
                console.log(payload);
                const token = jwt.sign(payload, config.jwtSecret);
                console.log(token);
                res.json({
                    token: token,
                    message: "Redirect Home"
                });
                // res.send(result);
                //jwt 
            })
        }
    }).catch((err) => {
        res.status(500).send("Error");
    })
}

//verify email
exports.verifyEmail = function (req, res) {
    let otp = Math.floor((Math.random() * 9000) + 1000)
    const mailOptions = {
        from: 'ayush@cronj.com',
        to: req.params.email,
        subject: 'My facebook App Forget password OTP',
        html: '<p>Your OTP for changing password is : ' + otp + '</p>'
    };

    services.findEmail(req.params.email).then((result) => {
        if (result.rowCount === 1) {
            services.statusverify(req.params.email).then((result1) => {
                if (result1.rowCount === 1) {
                    services.forgetAdd(req.params.email, otp).then((result) => {
                        if (result.rowCount === 1) {
                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err)
                                    res.status(500).send(err)
                            });
                        }
                        res.send("Redirect Change")
                    })
                }
                else {
                    const mailOptions1 = {
                        from: 'ayush@cronj.com',
                        to: req.params.email,
                        subject: 'My facebook App Registration OTP',
                        html: '<p>Your new OTP for registration is : ' + otp + '</p>'
                    };
                    services.forgetAdd(req.params.email, otp).then((result) => {
                        if (result.rowCount === 1) {
                            transporter.sendMail(mailOptions1, function (err, info) {
                                if (err)
                                    res.status(500).send(err)
                            });
                        }
                        res.send("Redirect Register")
                    })
                }
            })
        }
        else if (result.rowCount === 0) {
            res.status(404).send("Email Not found");
        }
    }).catch((err) => res.status(500).send(err));
}

//forgetotp
exports.forgetOtp = function (req, res) {
    services.forgetOtp(req.params.otp, req.params.email).then((result) => {
        if (result.rowCount === 0) {
            res.status(404).send("Incorrect Credentials");
        }
        else {
            res.send(result.rows);
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
}

//change password
exports.changePass = function (req, res) {
    bcrypt.hash(req.params.pass, saltRounds).then(function (hash) {
        services.changePass(req.params.email, hash).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }).catch((err) => {
        res.status(500).send(err);
    })
}