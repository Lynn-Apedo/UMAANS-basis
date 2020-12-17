const bcrypt = require("bcrypt");
const models = require("../models");
const { User, Project } = models;

module.exports = {
  addUser: async (data) => {
    const { id, firstName, lastName, email, password, pseudo, isPro } = data;
    const bcryptHash = await bcrypt.hash(password, 5);
    console.log("🚀 ~ file: userController.js ~ line 9 ~ addUser: ~ bcryptHash", bcryptHash)
    if (bcryptHash) {
      return User.create({
        id,
        firstName,
        lastName,
        email,
        password: bcryptHash,
        pseudo,
        isPro,
      });
    }
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
            "id",
            "userId",
            "countryId",
            "categoryId",
            "architect",
            "size",
            "year",
            "title",
            "projectDescr",
            "mainPicture",
            "link",
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
  
  // var password = data.password
  // console.log(" password", password)
  // const bcryptHash = await bcrypt.hash(password, 10);

    // BCRYPT NEED TO BE FIX OVER HERE !!!!! 
    let test = await bcrypt.hash(data.password, 10);
    // console.log("TCL: test", test)

    let test2 = {password:test}
    // console.log("TCL: test2", test2)
const mixed = Object.assign(data, test2)
// console.log("TCL: mixed", mixed)


    console.log('=====> 1')
    const userUpdate = await User.update( data, { where: { id } });
    console.log("TCL: data UPDATE", data)
    console.log("TCL: userUpdate CONTROLLER", userUpdate)
    if (userUpdate) {
    console.log('=====> 2')
      return  User.findOne({
        where: { id },
      });
    }

    // WOOOOORKING
    // const getUserId = data.id
    // // console.log("TCL: getUserId", getUserId)
    // console.log('=====> req.body:', data.password)
    // console.log("data:", data)
    // //  BCRYPT is working !!!!
    // let test = await bcrypt.hash(data.password, 10)
    // // console.log("TCL: test", test)
    // WOOOOORKING
    

// const userUpdate = await User.update()
    // const bcryptHash = await bcrypt.hash(password, 5);
    // // console.log("TCL: bcryptHash", bcryptHash)
    // if (bcryptHash){
    // console.log('data et bcryp:', data.password.bcryptHash)

    // }
  },

  deleteUserById: (id) => {
    return User.destroy({
      where: {
        id,
      },
    });
  },
};
