const mongoose = require("mongoose");
const { Schema } = mongoose;
const carOwnerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  carImage:{
  public_id:{type:String,required:true},
  url:{ type:String,required:true,},
  role:{type:String,default: "carOwner"},
  createdAt:{type: Date,default:Date.now(),}}
});

module.exports = CarOwner = mongoose.model("carOwner", carOwnerSchema);
