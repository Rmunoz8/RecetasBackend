'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FollowSchema = Schema({
    usuario: {type: Schema.ObjectId, ref: 'Usuario'},
    followed: { type: Schema.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Follow', FollowSchema);