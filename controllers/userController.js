const bcrypt = require("bcrypt");

const models = require("../models");

const { User, Project } = models;

module.exports = {
  addUser: async (data) => {
    const { id, firstName, lastName, email, password, pseudo, isPro } = data;
    const bcryptHash = await bcrypt.hash(password, 5);

    return User.create({
      id,
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
  getUserById: (userId) => {
    return User.findByPk(userId, {
      include: [
        {
          model: Project,
          attributes: [
            "userId",
            "countryId",
            "categoryId",
            "architect",
            "size",
            "year",
            "title",
            "projectDescr",
            "mainPicture",
          ],
        },
      ],
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
  updateUserById: async (id, data) => {
    const userUpdate = await User.update(data, { where: { id } });
    if (userUpdate) {
      return await User.findOne({
        where: { id },
      });
    }
  },
  deleteUserById: (id) => {
    return User.destroy({
      where: {
        id,
      },
    });
  },
};
