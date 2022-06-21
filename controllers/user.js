const User=require("../model/User");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

//sign up
exports.signup= async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const foundUser= await User.findOne({email:email});
        if (foundUser){
            return res.status(400).send({error:[{msg:"exist"}]});
        }
        //Cryptage
        const saltRounds = 10;
        const hashedpassword= await bcrypt.hash(password,saltRounds);
        const newUser=new User({...req.body});
        //Cryptage new user
        newUser.password=hashedpassword;
        //Json web token
        const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"1h"})
        await newUser.save();
        res.status(200).send({msg:"welcome",user:newUser,token});
    } catch (error) {
        res.status(400).send({msg:"failed",error});
    }
}
//signin
exports.signin= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const foundUser= await User.findOne({email:email});
        if (!foundUser){
            return res.status(400).send({error:[{msg:"bad credential"}]});
        }
        //Check password:compare
        const checkpassword=await bcrypt.compare(password,foundUser.password)
        if(!checkpassword){
            return res.status(400).send({msg:"bad credential"})
        }
        //Json web token
        const token=jwt.sign({id:foundUser._id},process.env.SECRET_KEY,{expiresIn:"1h"})
        res.status(200).send({msg:"welcome back",user:foundUser,token});
    } catch (error) {
        res.status(400).send({msg:"failed",error});
    }
}
//get all
exports.getallcars=async(req,res)=>{
    try {
        const carlist=await Car.find()
        res.status(200).send({msg:"This is our list",carlist})
    } catch (error) {
        res.status(400).send({msg:"There's no list",error})
    }
}
//get one car
exports.getonecar=async(req,res)=>{
    try {
        const {_id}=req.params;
        let carToGet= await Car.findOne({_id})
        res.status(200).send({msg:"This is our car",carToGet})
    } catch (error) {
        res.status(400).send({msg:"Car unavailable",error})
    }
}
