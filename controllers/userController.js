const User = require("../models/user.js");
const { prepareToken } = require("../utils/token");

class UserController{
  //------------------------REGISTRATION-------------------------
    async  signUpUser(req, res) {
      var user = new User({
        email: req.body.email,
        nick: req.body.nick,
      });
      user.setPassword(req.body.password);
      user.save()
        .then((user) => {
          const token = prepareToken(
            {
              id: user._id,
              nick: user.nick,
            }
          );
          return res.status(201).json({
            result: "Signuped successfully",
            token,
          });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Signup error" });
        });
    };
//--------------------------AUTHORIZATION-----------------------------
async loginUser(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(401).json({ error: "Password is required" });
    }
    User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "User not found" });
        }
        if (!user.validPassword(req.body.password)) {
          return res.status(401).json({ error: "Pass error" });
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
        return res.status(401).json({ error: "Login error" });
      });
  };
};

module.exports=new UserController();