import catchAsync from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import { UserServices } from "./User.services";
import { userSchema } from "./User.validation";

const createUSer = catchAsync(async (req, res) => {
  const user = req.body;
  const parseUser = userSchema.parse(user);
  const result = await UserServices.CreatUserServices(parseUser);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const UserController = {
  createUSer,
};
