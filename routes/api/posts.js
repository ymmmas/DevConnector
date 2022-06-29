const express = require('express');
const router = express.Router();

// @route   GET aip/posts
// @desc    test route 
// @access  Public (dont need token)
router.get('/', (req,res)=> res.send('Posts route'));

module.exports = router;