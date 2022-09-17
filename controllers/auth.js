const { response, request } = require("express");
const bcryptjs = require('bcryptjs') 

const Usuario = require("../models/usuario"); 
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express");

const login = async(req,res = response) => {
    
    const {correo, password} = req.body;
    
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        
        //Si el usuario está activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            })
        }


        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar JWT 
        const token = await generarJWT(usuario.id)
        
        return res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Comuniquese con el administrador"
        })
    }
}


const googleSignIn = async( req=request, res=response ) => {   
    const {id_token} = req.body;

    try {
        const { nombre, img, correo } = await googleVerify( id_token )

        // console.log(correo, nombre, img)
        let usuario = await Usuario.findOne({correo});
        console.log(usuario);
        if( !usuario ){
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                rol: 'USER_ROLE',
                google:true

            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT( usuario.id );

            res.json({
                usuario,
                token
            })
    } catch (error) {
        json.status(400).json({
            ok:false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}