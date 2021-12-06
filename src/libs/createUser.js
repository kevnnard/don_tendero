const User = require("../models/User");

const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "dontenderoadmin2021@gmail.com" });

  if (userFound) return;

  const newUser = new User({
    username: process.env.ADMIN_NAME,
    email: "dontenderoadmin2021@gmail.com",
  });

  newUser.password = await newUser.encryptPassword(process.env.PASSWORD_ADMIN);

  const admin = await newUser.save();

  console.log("Usuario de Admin creado...", admin);
};

const userC = createAdminUser();

module.exports = userC;