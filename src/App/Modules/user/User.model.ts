import { model, Schema } from "mongoose";

export const  UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "seller"],
        default: "user",
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
    
},
{
    timestamps: true,
}
)

export const UserModel = model("User", UserSchema);