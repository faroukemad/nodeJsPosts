const authService = require("../services/authService");
const { signupValidate, loginValidate} = require("../utils/authValidate");

exports.signUp = async (req, res) => {
  const error = signupValidate(req.body);
  if (error) return res.status(400).send(error);

  const { user, error: serviceError } = await authService.registerUser(req.body);
  if (serviceError) return res.status(400).send(serviceError);

  res.status(200).send({ message: "User registered successfully", user });
};

exports.logIn = async (req, res) => {
 const error= loginValidate(req.body);
 if (error) return res.status(400).send(error);

  const {
    user,
    token,
    error: serviceError,
  } = await authService.authentiaceUser(email, password);
  if (serviceError) return res.status(400).send(serviceError);
  res.status(200).send({ message: "Login successful", token });
};
