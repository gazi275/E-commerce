import { Response } from "express";

interface Tresponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

 export const sendResponse = <T>(res: Response, data: Tresponse<T>) => {
  return res.status(data.status).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
