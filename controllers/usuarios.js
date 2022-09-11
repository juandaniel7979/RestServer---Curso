const {response, request} = require('express')

const usuariosGet = (req = request,res = response)=>{
    const {q,apikey,name='No name'} = req.query;
    res.json({
        msg:'API Get - controlador',
        q,
        apikey,
        name
    })
}


const usuariosPost = (req,res = response)=>{
        const {nombre,edad} = req.body;

        res.status(500).json({
            msg:'API Post - controlador ',
            nombre,
            edad
        })
}


const usuariosPut = (req,res = response)=>{
    const id = req.params.id;
    res.json({
        msg:'API Put - controlador',
        id
    })
}
const usuariosPatch = (req,res = response)=>{
    res.json({
        msg:'API Patch - controlador'
    })
}

const usuariosDelete = (req,res = response)=>{
    res.json({
        msg:'API Delete - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}