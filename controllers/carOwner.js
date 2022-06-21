const Car=require("../model/Car");
const carOwner=require("../model/CarOwner")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const CarOwner = require("../model/CarOwner");

//sign up
exports.signup= async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const foundCarOwner= await CarOwner.findOne({email:email});
        if (foundCarOwner){
            return res.status(400).send({error:[{msg:"exist"}]});
        }
        //Cryptage
        const saltRounds = 10;
        const hashedpassword= await bcrypt.hash(password,saltRounds);
        const newCarOwner=new CarOwner({...req.body});
        //Cryptage new user
        newCarOwner.password=hashedpassword;
        //Json web token
        const token=jwt.sign({id:newCarOwner._id},process.env.SECRET_KEY,{expiresIn:"1h"})
        await newCarOwner.save();
        res.status(200).send({msg:"welcome",carOwner:newCarOwner,token});
    } catch (error) {
        res.status(400).send({msg:"failed",error});
    }
}
//signin
exports.signin= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const foundCarOwner= await CarOwner.findOne({email:email});
        if (!foundCarOwner){
            return res.status(400).send({error:[{msg:"bad credential"}]});
        }
        //Check password:compare
        const checkpassword=await bcrypt.compare(password,foundCarOwner.password)
        if(!checkpassword){
            return res.status(400).send({msg:"bad credential"})
        }
        //Json web token
        const token=jwt.sign({id:foundCarOwner._id},process.env.SECRET_KEY,{expiresIn:"1h"})
        res.status(200).send({msg:"welcome back",user:foundCarOwner,token});
    } catch (error) {
        res.status(400).send({msg:"failed",error});
    }
}
//get all
exports.getall=async(req,res)=>{
    try {
        const carlist=await Car.find()
        res.status(200).send({msg:"This is our list",carlist})
    } catch (error) {
        res.status(400).send({msg:"There's no list",error})
    }
}
//get one car
// exports.getone=async(req,res)=>{
//     try {
//         const {_id}=req.params;
//         let carToGet= await Car.findOne({_id})
//         res.status(200).send({msg:"This is our car",carToGet})
//     } catch (error) {
//         res.status(400).send({msg:"Car unavailable",error})
//     }
// }
// //
// exports.addcar=async(req,res)=>{
//     const {brand,phone,location}=req.body
//     //handling errors
//     if (!brand.length || !phone.length || !location.length) {
//         res.status(400).send({msg:"should put info"})
// }
//     //handling error email is unique
//     const car=await Car.findOne({phone:phone})
//     if (!car){
//         res.status(400).send({msg:"add a car"})
//         }
//     try {
//         const newcar=new Car({brand,phone,location})
//         await newcar.save()
//         res.status(200).send({msg:"add car with success",newcar})
//     } catch (error) {
//         res.status(400).send({msg:"failed to adding car",error})
//     }
// }