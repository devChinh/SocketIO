const router = require('express').Router();
const {register}  = require('../controllers/userController') 
const {login} = require('../controllers/userController')
const {setAvatar} = require('../controllers/userController')
const {getAllUsers} = require('../controllers/userController')

router.post('/register',  register);
router.post('/login', login);
router.post('/setAvatar/:id' , setAvatar);
router.get('/allusers/:id', getAllUsers);

module.exports = router;