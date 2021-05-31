const express = require('express');
const { creatusers, getusers, updateusers, deleteusers } = require('./controllers/user.controller')

const router = express.Router();

router.post('/users', creatusers);
router.get('/users', getusers);
router.put('/users', updateusers);
router.delete('/users', deleteusers);

module.exports = router;