const joi = require('@hapi/joi')

const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(5).required(),
    email: joi.string().min(5).required().email(),
    password: joi.string().min(6).required(),
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(5).required().email(),
    password: joi.string().min(6).required(),
  })
  return schema.validate(data)
}

const editValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(5),
    email: joi.string().min(5).email(),
    newPassword: joi.string().min(6),
    password: joi.string().min(6),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.editValidation = editValidation
