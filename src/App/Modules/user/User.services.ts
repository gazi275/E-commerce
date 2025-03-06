import { UserModel } from "./User.model";
import { IUSer } from "./User.schema";

const CreatUserServices = async (data: IUSer) => {
  const result = await UserModel.create(data);
  return result;
};

const AllUserServices = async () => {
  const result = await UserModel.find({ isDeleted: false }).lean();
    return result;
}

const GetUserServices = async (id: string) => {
  const result = await UserModel.findById({ id, isDeleted: false }).lean;
  return result;
};

export const UserServices = {
  CreatUserServices,
  GetUserServices,
  AllUserServices
};
