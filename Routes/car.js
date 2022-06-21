const Car = require("../model/Car");
const {verifyTokenAndAdmin, verifyTokenUserisCarowner} = require("../Middleware/auth");
const router = require("express").Router();

//CREATE CAR

router.post("/addcar", verifyTokenAndAdmin,verifyTokenUserisCarowner, async (req, res) => {
  
  const newCar = new Car(req.body);
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.car.uploader.upload(images[i], {
      folder: "cars",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CAR

router.put("updatecar/:id", verifyTokenAndAdmin,verifyTokenUserisCarowner, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CAR
router.delete("deletecar/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Car has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ONE CAR
router.get("/getonecar/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL CAR
router.get("/getcars",async(req,res)=>{
    try {
        const carlist=await Car.find()
        res.status(200).send({msg:"This is our list",carlist})
    } catch (error) {
        res.status(400).send({msg:"There's no list",error})
    }
})

module.exports = router;