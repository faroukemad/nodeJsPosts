const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";
const authValidate = require("../utils/authValidate");

exports.signUp = async (req, res) => {
  const error = authValidate(req.body);
  if (error) return res.status(400).send(error);
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  user = new User({ name, email, password: hashPassword });
  await user.save();
  res.status(200).send({ message: "User registered successfully", user });
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email and password are required.");
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user.id, _email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).send({ message: "Login successful", token });
};
