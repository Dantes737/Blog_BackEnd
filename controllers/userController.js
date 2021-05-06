const User = require("../models/user.js");
const Profile = require("../models/profile.js");
const ApiError = require('../error/ApiError.js');
const { prepareToken } = require("../utils/token");
const Validator = require('../utils/validators.js')

class UserController {
  //------------------------REGISTRATION-------------------------
  async signUpUser(req, res, next) {
    ////------------------------VALIDATORS-----------------------------------/////////////
    if (!req.body.nick) {
      next(ApiError.badRequest("Nick is required"));
      return;
    }
    if (!req.body.email) {
      next(ApiError.badRequest("Email is required"));
      return;
    }
    if (!req.body.password) {
      next(ApiError.badRequest("Password is required"));
      return;
    }
    if (!Validator.validateEmail(req.body.email)) {
      next(ApiError.badRequest("Not valid email"));
      return;
    }
    if (!Validator.validatePassword(req.body.password)) {
      next(ApiError.badRequest("Not valid password. Should contain at least one digit,one lower case,one upper case, at least 8 from the mentioned characters"));
      return;
    }
    if (!Validator.validateNick(req.body.nick)) {
      next(ApiError.badRequest("Not valid nick"));
      return;
    }

    let userNickExist = await User.exists({ nick: req.body.nick });
    if (userNickExist) {
      return res.status(201).json(
        {
          result: "warning",
          message: "User with such nick already exists!"
        });
    };

    let userEmailExist = await User.exists({ email: req.body.email });
    if (userEmailExist) {
      return res.status(201).json(
        {
          result: "warning",
          message: "User with such Email already exists!"
        });
    };
    ////------------------------VALIDATORS----------------------------------------/////////////
    const user = new User({
      nick: req.body.nick,
      email: req.body.email
    });
    await user.setPassword(req.body.password);
    await user.save()
      .then((user) => {

        //////////////////////////
        const profile = new Profile({
          _id: user._id,
          age: "age",
          city: "Enter your city",
          country: "country",
          email: user.email,
          friends: [],
          name: "Enter your name",
          nick: user.nick,
          avatarIMG: "https://walkersarewelcome.org.uk/wp-content/uploads/computer-icons-google-account-icon-design-login-png-favpng-jFjxPac6saRuDE3LiyqsYTEZM.jpg",
          status: "Your status"
        });
       await profile.save();
        /////////////
        const token = prepareToken(
          {
            id: user._id,
            nick: user.nick,
          }
        );
        return res.status(201).json({
          result: "Success!"
        });
      })
      .catch((err) => {
        next(ApiError.badRequest("SignIn error!"));
      return;
      });
  };
  //--------------------------AUTHORIZATION-----------------------------
  async loginUser(req, res, next) {
    if (!req.body.email) {
      next(ApiError.authError("Email is required!"));
      return;
    }
    if (!req.body.password) {
      next(ApiError.authError("Password is required"));
      return;
    }
   await User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(201).json(
            {
              result: "warning",
              message: "User not found!"
            });
        }
        if (!user.validPassword(req.body.password)) {
          return res.status(201).json(
            {
              result: "warning",
              message: "Pass error!"
            });
        }
        const token = prepareToken(
          {
            id: user._id,
            nick: user.nick,
          }
        );
        const expiresAt = new Date().getTime() + 36000000;
        res.status(200).json({
          result: "Authorized",
          user: {
            authData: {
              nick: user._doc.nick,
              email: user._doc.email,
              id: user._doc._id,

              access_token: token,
            },
            expiresAt,
          },
        });
      })
      .catch((err) => {
        next(ApiError.authError("Login error"));
        return;
      });
  };
};

module.exports = new UserController();