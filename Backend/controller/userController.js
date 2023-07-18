const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const gerenateToken = require("../Config/generateToken");
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Plese Enter All The block");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exits");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: gerenateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Faild to create a user");
  }
});
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: gerenateToken(user._id),
    });
  }
});
const allUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
7
  const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
