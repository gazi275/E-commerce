import { UserModel } from "./User.model";
import { IUSer } from "./User.schema";

const CreatUserServices = async (data: IUSer) => {
  const result = await UserModel.create(data);
  return result;
};

export const UserServices = {
  CreatUserServices,
};
