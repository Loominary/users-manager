var express = require('express');
var router = express.Router();

const users = require('../controllers/users');

router.get      ('/', users.getAllUsers);
router.post     ('/', users.addUser);
router.delete   ('/', users.deleteUser)


module.exports = router;
