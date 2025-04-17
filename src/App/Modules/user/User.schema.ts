import { Model } from "mongoose";

export interface IUSer {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "seller";
  contact: string;
  address: string;
  isDeleted: boolean;
  isVerified: boolean;
}
export interface IUserModel extends Model<IUSer> {
  isUserExistByCustomId: (id: string) => Promise<IUSer>;
  isUserExistByEmail: (email: string) => Promise<IUSer>;
  isPasswordMatched: (
    password: string,
    hashPassword: string
  ) => Promise<boolean>;
}
