const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/Users')

// @route   GET aip/auth
// @desc    test route 
// @access  Public (dont need token)
router.get('/', auth, async (req,res)=> {
    try {
        // select user but not its pw info
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});
module.exports = router;