const bcrypt = require("bcrypt");

const models = require("../models");

const { User } = models;

module.exports = {
  addUser: async (data) => {
    const { firstName, lastName, email, password, pseudo, isPro } = data;
    const bcryptHash = await bcrypt.hash(password, 5);

    return User.create({
      firstName,
      lastName,
      email,
      password: bcryptHash,
      pseudo,
      isPro,
    });
  },
  checkEmail: (email) => {
    return User.findOne({
      attributes: ["email"],
      where: {
        email,
      },
    });
  },
  getUserByEmail: (email) => {
    return User.findOne({
      where: {
        email,
      },
    });
  },
  checkPassword: (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
  },
};
