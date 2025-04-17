import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { IUSer, IUserModel } from "./User.schema";

export const UserSchema = new Schema(
  {
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
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "*********";
  next();
});

UserSchema.static("isUserExistByCustomId", async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false });
});

UserSchema.static(
  "isPasswordMatched",
  async function (password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
);
UserSchema.static("isUserExistByEmail", async function (email: string) {
  return await this.findOne({ email, isDeleted: false });
});

export const UserModel = model<IUSer, IUserModel>("User", UserSchema);
