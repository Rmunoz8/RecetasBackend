'use strict'

let express = require('express');
let FollowController = require('../controllers/follow');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

api.post('/follow', md_auth.ensureAuth, FollowController.saveFollow);
api.delete('/follow/:id', md_auth.ensureAuth, FollowController.deleteFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowingusers);
api.get('/followed/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowedusers);
api.get('/myFollows', md_auth.ensureAuth, FollowController.getMyFollows);
api.get('/yourFollows', md_auth.ensureAuth, FollowController.getYourFollows);

module.exports = api;