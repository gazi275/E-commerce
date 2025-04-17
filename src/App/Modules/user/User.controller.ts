import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { UserServices } from "./User.services";
import { userSchema, UserUpdatedSchema } from "./User.validation";
import { IUSer } from "./User.schema";
import { AuthenticatedRequest } from "./../../middleware/authenticateRequest";

const createUSer = catchAsync(async (req, res) => {
  const user = req.body;
  const parseUser = userSchema.parse(user) as IUSer;
  const result = await UserServices.CreatUserServices(parseUser);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getUSerController = catchAsync(async (req: AuthenticatedRequest, res) => {
  const id = req?.user?.id;

  const result = await UserServices.GetUserServices(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const getAllUserController = catchAsync(async (req, res) => {
  const result = await UserServices.AllUserServices();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All user fetched successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: AuthenticatedRequest, res) => {
  const id = req?.user?.id;
  const user = req.body;
  const parseUser = UserUpdatedSchema.parse(user);
  const result = await UserServices.updateProfileService(id, parseUser);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const UserController = {
  createUSer,
  getUSerController,
  getAllUserController,
  updateUser,
};
