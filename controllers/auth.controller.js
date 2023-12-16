const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const maxAge = 3 * 24 * 60 * 60;
const createToken = ({id, role}, res) => {
  const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
  return res.status(200).json({
    successMessage: "Signin was successful.",
    data: { token: accessToken }
  });
};

module.exports.signup_handler = async (req, res) => {
  try {
    const { username, email, password, role, matric } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errorMessage: "User Already Exist" });
    }

    const newAdminUser = new User({
      username,
      email,
      password,
      role,
      matric,
      verified: false,
    });

    newAdminUser
      .save()
      .then(({_id, email}) => {
        return res.status(200).json({
          successMessage: "Signup was successful.",
          data: { userId: _id, email }
        });
      })
      .catch((error) => {
        return res.json({
          errorMessage:
            "Something went wrong, while saving admin user account, please try again.",
        });
      });
  } catch (error) {
    let errors = handleErrors(error);
    return res.json({
      errors,
    });
  }
};

module.exports.login_handler = async (req, res) => {
  const { matric, password } = req.body;

  try {
    const user = await User.findOne({ matric });
    if (!user) {
      return res.status(400).json({ errorMessage: "Invalid credentials!" });
    }
    let auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ errorMessage: "Invalid credentials!" });
    }

    createToken(user, res)
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
