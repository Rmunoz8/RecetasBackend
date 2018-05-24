'use strict'

let mongoosePaginate = require('mongoose-pagination');

let Usuario = require('../models/usuario');
let Follow = require('../models/follow');

// Seguir usuario
function saveFollow(req, res){
    let params = req.body;
    let follow = new Follow();

    follow.usuario = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored)=>{
        if(err) return res.status(500).send({message:`Error al guardar el siguimento`});

        if(!followStored) return res.status(404).send({message: `El seguimiento no se ha guardado`});

        return res.status(200).send({follow: followStored});
    });
}
// Dejar de seguir a usuario
function deleteFollow(req, res){
    let userId = req.user.sub;
    let followId = req.params.id;

    Follow.find({'usuario':userId, "followed":followId}).remove(err=>{
        if (err) return res.status(500).send({ message: `Error al dejar de seguir` });

        return res.status(200).send({ message: `Has dejado de seguir al usuario` });

    });

}
// Muestra listado de usuarios seguidos, si no llega ninguna ID por ls url, se muestran los del mismo usuario
function getFollowingusers(req, res){//NO FUNCIONA DEL TODO BIEN REVISAR
    let userId = req.user.sub;

    if (req.params.id && req.params.page) {
        userId = req.params.id;
    }

    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    } else {
        page = req.params.id;
    }

    let itemsPerPage = 2;

    Follow.find({ usuario: userId }).populate({ path: 'followed' }).paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) return res.status(500).send({ message: `Error al listar los usuarios` });

        if (!follows) return res.status(404).send({ message: `Actualmente no sigues a nadie` });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            follows
        })

    })
}
// Muestra los usuarios que nos siguen
function getFollowedusers(req, res) {//NO FUNCIONA DEL TODO BIEN REVISAR
    let userId = req.user.sub;

    if (req.params.id && req.params.page) {
        userId = req.params.id;
    }

    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    } else {
        page = req.params.id;
    }

    let itemsPerPage = 2;

    Follow.find({ followed: userId }).populate('usuario followed').paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) return res.status(500).send({ message: `Error al listar los usuarios` });

        if (!follows) return res.status(404).send({ message: `Actualmente no te sigue nadie` });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            follows
        })

    })
}
// Muestra TODOS los usuarios que sigues (Sin paginar)
function getMyFollows(req, res){    
    
    let userId = req.params.id;

    Follow.find({usuario:userId}).populate('usuario followed').exec((err, follows)=>{
        if (err) return res.status(500).send({ message: `Error al listar los usuarios` });

        if (!follows) return res.status(404).send({ message: `Actualmente no sigues a nadie` });
        return res.status(200).send({ follows });
    });
}
// Muestra TODOS los usuarios que te siguen (Sin paginar)
function getYourFollows(req, res){
    let userId = req.user.sub;

    Follow.find({followed:userId}).populate('usuario followed').exec((err, follows)=>{
        if (err) return res.status(500).send({ message: `Error al listar los usuarios` });

        if (!follows) return res.status(404).send({ message: `Actualmente no te sigue nadie` });

        return res.status(200).send({ follows });
    });

}

module.exports = {
    saveFollow,
    deleteFollow,
    getFollowingusers,
    getFollowedusers,
    getMyFollows,
    getYourFollows

}