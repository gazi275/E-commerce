export type IUSer ={
    name:string;
    email:string;
    password:string;
    role:"admin" | "user" | "seller" ;
    contact?:string;
    address?:string;
    isDeleted: boolean;
    isVerified: boolean;

}