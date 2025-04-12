
import catchAsync from "../../Utils/catchAsync";
import { AuthServices } from "./auth.service";
import { loginValidationSchema } from "./auth.validation";
import { sendResponse } from "../../Utils/sendResponse";


const loginUser = catchAsync(async (req, res) => {
const parserdData= loginValidationSchema.parse(req.body);
const result = await AuthServices.Login(parserdData); 
sendResponse(res, {
    status: 200,
    success: true,
    message: "User login successfully",
    data: result,
    });


}
)
export const AuthController = {
    loginUser}