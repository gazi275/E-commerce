import { UserModel } from "../Modules/user/User.model";

const login = async (email: string, password: string) => {
  const loggedUser = await UserModel.find({ email });
  if (!loggedUser) throw new Error("User not found");

  const jwtToken= ''

};
