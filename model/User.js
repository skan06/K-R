const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:{type:String,default: "user"},
  isAdmin: {type: Boolean,default: false},
  isCarOwner: {type: Boolean,default: false},
});

module.exports = User = mongoose.model("user", userSchema);
