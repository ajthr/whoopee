// Import Packages
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Import Models
const User = require('../models/user')

const {
  registerValidation,
  loginValidation,
  editValidation,
} = require('../validation')

// Signup User
router.post('/signup', async (req, res) => {
  // Validate Data
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Check if email already exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('email exists')

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    await user.save()
    return res.status(201).send()
  } catch (err) {
    return res.status(400).send()
  }
})

// Login User
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("email doesn't exists")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('wrong password')

  const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN)
  return res.status(200).send({ token: token, uid: user._id })
})

router.get('/u/:uid', async (req, res) => {
  try {
    const user = await User.findById(req.params.uid)
    return res.status(200).send({ name: user.name, email: user.email })
  } catch (err) {
    return res.status(401).send(err)
  }
})

router.get('/u/:uid', async (req, res) => {
  try {
    const user = await User.findById(req.params.uid)
    if (!user) return res.status(400).send("email doesn't exists")

    return res.status(200).send({ name: req.body.name, email: req.body.email })
  } catch (err) {
    return res.status(401).send(err)
  }
})

router.patch('/u/:uid', async (req, res) => {
  const { error } = editValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findById(req.params.uid)
  if (!user) return res.status(400).send("user doesn't exists")

  let newPassword = null
  if (req.body.newPassword === null) {
    newPassword = user.password
  } else {
    const salt = await bcrypt.genSalt(10)
    newPassword = await bcrypt.hash(req.body.newPassword, salt)
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('wrong password')

  try {
    await User.findByIdAndUpdate(req.params.uid, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
      },
    })
    return res.status(200).send({ name: req.body.name, email: req.body.email })
  } catch (err) {
    return res.status(401).send(err)
  }
})

module.exports = router
