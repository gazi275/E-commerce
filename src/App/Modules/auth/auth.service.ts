import { UserModel } from "../user/User.model";
import { Tlogin } from "./auth.schema";

const Login = async (payload : Tlogin)=>{
    const user = await UserModel.findOne({
        email : payload.email})
     if(!user) throw new Error('User not found');
}