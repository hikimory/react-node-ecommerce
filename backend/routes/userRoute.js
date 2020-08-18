const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.get("/createadmin", async (req, res) => {
    try {
      const user = new User({
        name: 'Nick',
        email: 'n@mail.com',
        password: '1234',
        isAdmin: true
      });
      const newUser = await user.save();
      res.send(newUser);
    } catch (error) {
      res.send({ msg: error.message });
    }
});

module.exports = router