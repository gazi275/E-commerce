import config from "../../config";
import { UserModel } from "../user/User.model";
import { Tlogin } from "./auth.schema";
import jwt from "jsonwebtoken";

const Login = async (payload: Tlogin) => {
    const user = await UserModel.isUserExistByEmail(payload.email);
   if(!user){
    throw new Error("User does not exist");
  }
  
  if (user.isDeleted) {
    throw new Error("User is deleted");
  }
  
  if (
    (await UserModel.isPasswordMatched(payload.password, user.password)) ===
    false
  ) {
    throw new Error("Password is incorrect");
  }
  const token = jwt.sign({id : user._id, role:user.role},config.JWT_SECRET as string, {
    expiresIn: "1d",})


  return {token, user}
    
};
export const AuthServices = {
  Login,
};
