import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

export const decodeJwtMiddleware =
  ({ transformRequest, header }: { transformRequest?: (request: Request) => void; header?: string }) =>
  (request: Request, _: Response, next: (error?: Error) => void) => {
    const authHeader = request.header(header ?? 'Authorization');

    if (!authHeader) {
      next();

      return;
    }

    const token = jwt.decode(authHeader.replace('Bearer ', ''), { json: true });

    if (!token) {
      next();

      return;
    }

    transformRequest?.(request);
  };
