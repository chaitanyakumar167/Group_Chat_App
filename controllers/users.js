const User = require("../models/user");
const sequelize = require("../util/database");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findAll({ where: { email } });

    if (user.length > 0) {
      return res
        .status(409)
        .json({ message: "user already exist", success: false });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (!err) {
        await User.create({
          name: name,
          email: email,
          password: hash,
        });
      }
    });
    return res
      .status(201)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

function generateAccessToken(id){
  return jwt.sign({userId:id},process.env.TOKEN_SECRET)
}

exports.loginUser = async (req,res) =>{

  try {
    
    const {email,password} = req.body;
  
    const user = await User.findAll({where:{email}});
  
    if(user.length>0){
      bcrypt.compare(password,user[0].password, (err,result)=>{
        if(err){
          throw new Error('something went wrong')
        }
        if(result === true){
          return res.status(200).json({message:'User login successfull',success:true,token:generateAccessToken(user[0].id)})
        }else{
          return res.status(401).json({message:'User not authorized',success:false,})
        }
      })
    }else{
      return res.status(404).json({message:'User not found',success:false})
    }
  } catch (error) {
    res.status(500).json({message:error,success:false})
  }


}
