const router = require('express').Router();
const {addMessage}  = require('../controllers/messageController') 
const {getAllMessage} = require('../controllers/messageController')

router.post('/addmsg',  addMessage);
router.post('/getmsg', getAllMessage);


module.exports = router;