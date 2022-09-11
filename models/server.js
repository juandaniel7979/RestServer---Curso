const express = require('express')
const cors =require('cors')

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api'

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use('/api/usuarios',require('../routes/user'))
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server run in port', this.port);
        })
    }
}

module.exports=Server