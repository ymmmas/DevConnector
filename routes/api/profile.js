const express = require('express');
const router = express.Router();

// @route   GET aip/profile
// @desc    test route 
// @access  Public (dont need token)
router.get('/', (req,res)=> res.send('Profile route'));

module.exports = router;