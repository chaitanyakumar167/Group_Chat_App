const Group = require("../models/group");
const Chat = require("../models/chat");
const User = require('../models/user')
const UserGroup = require("../models/usergroup");


exports.createGroup = async (req, res) => {
  try {
    const { groupname,username } = req.body;
    const group = await Group.create({ name: groupname,owner:username });
    await UserGroup.create({
      userId: req.user.id,
      groupId: group.id,
      groupname:groupname,
      isadmin: true,
    }); 
    res
      .status(200)
      .json({
        message: "group created successfully",
        groupId: group.id,
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, success: false });
  }
};

exports.getUserGroups = async (req, res) => {
  try {
    const groups = await UserGroup.findAll({
       where: { userId: req.user.id },
       attributes:["groupname"],
      });
    res.status(200).json({ groups: groups, success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error, success: false });
  }
};

exports.addGroupMember = async (req, res) => {
  try {
    
    const {groupname,email}=req.body;
    const group = await Group.findOne({where:{name:groupname}})
    if(group){
      const adminUsers =await UserGroup.findAll({
        where:{
            isadmin:1,
            groupId:group.id,
        }
      })
      for(let i=0; i<adminUsers.length; i++){
        let adminUser=adminUsers[i]
  
        if(adminUser.userId === req.user.id){
          const toCheckUserEmail = await User.findOne({where:{email}})
          if(toCheckUserEmail){
            const response =await UserGroup.create({
              userId: toCheckUserEmail.id,
              groupId: group.id,
              groupname:groupname,
              isadmin: false,
            })
  
             res.status(200).json({message:"User added Successfully",success:true})
          }else{
             res.status(404).json({message:'Email not found',success:false})
          }
        }else{
           res.status(201).json({message:"Only Admin can add members" , success:false});
        }
      }
  
    }else{
      res.status(201).json({message:"please enter correct existing groupname",success:false})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong",success:false})
  }
  
};

exports.postUserMessageToDB = async (req, res, next) => {
  try {
    const { message, username ,groupname} = req.body;
    
    let chatGroup = await Group.findOne({ where: { name: groupname } });

    let postedMessage = await req.user.createChat({
      username: username,
      message: message,
      groupId: chatGroup.dataValues.id,
    });

    return res.status(200).json({ message: postedMessage });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
};

exports.getAllMessages = async (req, res, next) => {

  try {
      const groupname = req.params.groupnameparams

      let chatGroup = await Group.findOne({ where: { name: groupname } })

      let userMessages = await Chat.findAll({
          where: {

              groupId: chatGroup.dataValues.id

          },
          attributes:['username','message']
      })


      return res.status(200).json({ messages: userMessages })


  } catch (err) {
    console.log(err)
      return res.status(500).json({ message: "error" })
  }
}





