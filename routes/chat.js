const express = require('express')
const chatController = require('../controllers/chat')
const userAuthentication = require('../middleware/auth')

const router = express.Router();

router.post('/creategroup',userAuthentication.authenticate,chatController.createGroup)

router.get('/getallgroups',userAuthentication.authenticate,chatController.getUserGroups)

router.post('/addgroupmember',userAuthentication.authenticate,chatController.addGroupMember)

router.post('/sendmessage',userAuthentication.authenticate,chatController.postUserMessageToDB)

router.get('/getallmessages/:groupnameparams',userAuthentication.authenticate,chatController.getAllMessages)

module.exports = router;