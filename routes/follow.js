'use strict'

let express = require('express');
let FollowController = require('../controllers/follow');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

api.post('/follow', FollowController.saveFollow);
api.post('/esSeguido', FollowController.esSeguido);
api.post('/unFollow', FollowController.deleteFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowingusers);
api.get('/followed/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowedusers);
api.get('/myFollows/:id?', FollowController.getMyFollows);
api.get('/yourFollows/:id?', FollowController.getYourFollows);

module.exports = api;