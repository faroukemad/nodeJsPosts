const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

exports.registerUser = async ({name, email, password}) => {
  let user = await User.findOne({ email });
  if (user) return { error: "User already registered." };

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  user = new User({ name, email, password: hashPassword });
  await user.save();
  return user;
};

exports.authentiaceUser = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) return { error: "Invalid email or password." };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return { error: "Invalid email or password." };

  const token = jwt.sign({ _id: user.id, _email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};
