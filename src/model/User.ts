import mongoose,{Schema,Document} from "mongoose";
import { TbSunWind } from "react-icons/tb";

export interface Message extends Document{
    content:string,
    createdAt:Date
    
} //this is for the type safety.

const MessageSchema : Schema<Message>= new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
})

export interface User extends Document {
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerifed:boolean,
    IsAcceptingMessage:boolean,
    messages : Message[]
    createdAt:Date
}

const UserSchema : Schema<User>= new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,"enter a valid email address"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    verifyCode:{
        type:String,
        required:[true, "verifyCode is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verifyCodeExpiry is must"],
    },
    isVerifed:{
        type:Boolean,
        default:false
    },
    IsAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema],

})

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema));
export default UserModel; 