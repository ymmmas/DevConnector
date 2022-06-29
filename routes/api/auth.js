const express = require('express');
const router = express.Router();

// @route   GET aip/auth
// @desc    test route 
// @access  Public (dont need token)
router.get('/', (req,res)=> res.send('Auth route'));

module.exports = router;