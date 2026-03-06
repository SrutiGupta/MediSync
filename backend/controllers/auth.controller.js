import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

export const SignUp=async (req,res)=>{
     try{const {name,email,password,role}=req.body;
     const userExist = await User.findOne({email});
     if(userExist) 
        {
            return res.status(400).json({message:"User already exist"})
        }
    const hashedPassword= await bcrypt.hash(password,10)
    const createUser=await User.create({
        email,
        name,
        password:hashedPassword,
        role
    })
    const token = await genToken(createUser._id)

        res.cookie("token",token,{
                httpOnly:true,
                maxAge:7*1000*60*60*24,
                secure:true,
                sameSite:"None"
        })

        return res.status(201).json({message:"User created successfully"})
}
        catch(err){
            return res.status(500).json({message:"Internal Server Error"})
    }
}

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
   const token = await genToken(user._id)

        res.cookie("token",token,{
                httpOnly:true,
                maxAge:7*1000*60*60*24,
                secure:true,
                sameSite:"None"
        })

    res.status(200).json({
      message: "Login successful",
      token,
      user
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const logOut=async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"User logged out successfully"})
    }
    catch(err){
        return res.status(500).json({message:"logout Error"})
    }
}