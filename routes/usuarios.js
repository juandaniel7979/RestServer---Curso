const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, exiseUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();

router.get('/',usuariosGet)
router.put('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(exiseUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut) 
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmail(),
    check('password', 'El password es obligatorio y superior a 6 letras').not().isEmail().isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo no es valido').custom(emailExiste),
    check('rol').custom( esRoleValido ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROLE']),
    validarCampos

],usuariosPost);
router.delete('/:id',[
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(exiseUsuarioPorId),
    validarCampos
],usuariosDelete);
router.patch('/',usuariosPatch) 

module.exports = router;