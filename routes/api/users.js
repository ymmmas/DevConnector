const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const normalize = require('normalize-url');

const User = require('../../models/Users');

// @route   POST api/users
// @desc    register user
// @access  Public (dont need token)
// http://localhost:5100/api/users
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there a any errors
      // 400 bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // see if exits exists in db
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get users gravatar
      const avatar = normalize(
        gravatar.url(email, {
          // default size, string of 200
          s: '200',
          // rating is pg
          r: 'pg',
          // default img
          d: 'mm',
        }),
        { forceHttps: true }
      );

      // creates a new user instance only, not actually saved
      user = new User({
        name,
        email,
        avatar,
        // this pw is not hashed
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      // update user's password into the hashed password
      user.password = await bcrypt.hash(password, salt);

      // save the user
      await user.save();

      // return jsonwebtoken
      // get user's id
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // will have to change exipre time later
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
