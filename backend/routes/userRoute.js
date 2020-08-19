const {Router} = require('express')
const User = require('../models/User')
const getToken = require('../util')
const router = Router()

router.post('/signin', async (req, res) => {
  const {email, password} = req.body
  const signinUser = await User.findOne({
    email,
    password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }
})

router.post('/register', async (req, res) => {

  const {email, name, password} = req.body
  const candidate = await User.findOne({email})

  if (candidate) {
    return res.status(400).json({msg: 'This user already exists'})
  }
  const user = new User({
    name,
    email,
    password
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }
})

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