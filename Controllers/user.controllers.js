const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {createAccount,findUserByUsername} = require("../Queries/user.queries.js");

const signupController = async(req,res)=>{
  const {body} = req;
  
  try{ 
  const {secret} = process.env;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password,salt);
    if(!hashedPassword){
      throw new Error("Unable to hash password");
    }

  const generatedToken = jwt.sign({username:body.username},secret); 
  if(!generatedToken){
      throw new Error("Unable to generate token");
    }

    const savedUser = await createAccount({...body,password:hashedPassword});
    res.status(201).json({message:"Account created",user:savedUser,token:generatedToken});
  }catch(error){
    res.status(500).json({message:"Failed to create User account"})
  }
}

const loginController = async(req,res)=>{
  const {username,password}=req.body;
  const {secret} = process.env;
  try{
    if(!username || !password){
      throw new Error("username and password fields are required")
    }
    const user = await findUserByUsername(username);
    if(!user){
      throw new Error("Incorrect username");
    }
    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
      throw new Error("Incorrect password");
    }
    res.status(200).json({message:"successfully loggedin",user,token:jwt.sign({username},secret)})
  }catch(error){
    res.status(401).json({message:error.message})
  }
}
module.exports = {signupController,loginController};