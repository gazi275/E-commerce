import catchAsync from "../../Utils/catchAsync";
import { LoginValidation } from "./auth.validation";

const loginUser = catchAsync(async (req, res) => {
const parserdData= LoginValidation.parse(req.body);
const result = await  


}
)