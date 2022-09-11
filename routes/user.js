const {Router} = require('express')

const router = Router();

router.get('/',(req,res)=>{
    res.json({
        msg:'Get api '
    })
})

router.put('/',(req,res)=>{
    res.status(403).json({
        msg:'Put api '
    })
})

router.post('/',(req,res)=>{
    res.status(500).json({
        msg:'Post api '
    })
})

router.delete('/',(req,res)=>{
    res.json({
        msg:'Delete api '
    })
})
router.patch('/',(req,res)=>{
    res.json({
        msg:'Patch api '
    })
})

module.exports = router;