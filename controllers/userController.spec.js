const mocha = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const models = require("../models");
const userController = require("./userController");
const { User } = models;

describe("user creation", () => {
  describe("addUser", () => {
    it("should execute addUser", async () => {
      //given
      const data = {
        firstName: "Thane",
        lastName: "Kryos",
        email: "usstk@mail.com",
        password: "azerty",
        pseudo: "ussNormandy",
        isPro: true,
      };
      const createSub = sinon.stub(User, "create");

      //when
      await userController.addUser(data);
      //then
      expect(createSub.calledOnce).to.be.true;
    });
  });
});
