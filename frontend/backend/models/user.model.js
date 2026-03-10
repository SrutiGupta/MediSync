import mongoose from "mongoose"
const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        role:
        {
            type:String,
            enum:["doctor","receptionist","admin"],
            required:true
        },
        password:{
            type:String,
            required:true
        },
        department:{
            type:String
        }
    },{timestamps : true}
);
const User=mongoose.model("User",UserSchema)
export default User;