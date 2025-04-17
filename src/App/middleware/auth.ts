import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "./authenticateRequest";
import config from "../config";

export const auth = (roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }

      const decoded = jwt.verify(
        token,
        config.JWT_SECRET as string
      ) as JwtPayload;

      if (!roles.includes(decoded.role)) {
        res
          .status(403)
          .json({ message: `Forbidden: Only ${roles.join(" or ")} allowed` });
        return;
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
