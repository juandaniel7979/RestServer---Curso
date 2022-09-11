const express = require('express')
const cors =require('cors')

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //lectura y Parseo de la data  
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.usuariosPath ,require('../routes/usuarios'))
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server run in port', this.port);
        })
    }
}

module.exports=Server