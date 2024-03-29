const api = require('../controller/api');
var passport = require('passport')
module.exports = app => {
    app.post('/api/users/register',  (req, res) => api.registerUser(req, res));
    app.get('/api/users/login/:email/:password', (req, res) => api.loginUser(req, res));
    app.get('/api/users/verify/:otp/:email', (req, res) => api.verifyUser(req, res));
    app.get('/api/users/forgetpass/:email',  (req, res) => api.verifyEmail(req, res));
    app.get('/api/users/forgetotp/:email/:otp', (req, res) => api.forgetOtp(req, res));
    app.get('/api/users/changepass/:email/:pass', (req, res) => api.changePass(req, res));
    app.get('/api/profile/home', passport.authenticate('jwt', { session: false }), (req, res) => api.homepage(req, res) )
    app.get('/api/profile/update', passport.authenticate('jwt', { session: false }),(req, res) => api.update(req, res) )
    app.get('/api/profile/changepass/:email/:passold/:passnew',(req, res) => api.changePass1(req, res) )
    app.get('/api/posts/add/:content', passport.authenticate('jwt', { session: false }),(req, res) => api.addPost(req, res))
    app.get('/api/posts/like/:postid/:type' , (req,res) => api.likePost(req,res))
};

// passport.authenticate('jwt', { session: false }),
// passport.authenticate('jwt', { session: false }),