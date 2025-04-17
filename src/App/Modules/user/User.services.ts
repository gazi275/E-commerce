import { UserModel } from "./User.model";
import { IUSer } from "./User.schema";

const CreatUserServices = async (data: IUSer) => {
  const user = await UserModel.findOne({ email: data.email });
  if (user) {
    throw new Error("User already exists");
  }
  const result = await UserModel.create(data);
  return result;
};

const AllUserServices = async () => {
  const result = await UserModel.find({ isDeleted: false }).lean();
  return result;
};

const GetUserServices = async (id: string) => {
  const result = await UserModel.findOne({ _id: id, isDeleted: false }).select(
    "-password"
  );
  console.log(result);
  return result;
};

const updateProfileService = async (
  userId: string,
  payload: Partial<IUSer>
) => {
  const user = await UserModel.findById(userId);
  if (!user || user.isDeleted) {
    throw new Error("User not found");
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updatedUser;
};

export const UserServices = {
  CreatUserServices,
  GetUserServices,
  AllUserServices,
  updateProfileService,
};
