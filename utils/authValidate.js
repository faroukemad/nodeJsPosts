const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required(),
});

function signupValidate( data ) {
  const { error } = userSchema.validate(data);
  return error ? error.details[0].message : null;
}

const loginSchema= Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().required(),
})

function loginValidate(data){
  const { error } = loginSchema.validate(data);
  return error ? error.details[0].message : null;
}
module.exports = { signupValidate, loginValidate };
