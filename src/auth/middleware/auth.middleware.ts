import { UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/user/entities/user.entity';
import { getRepository } from 'typeorm';

interface ReqWithUser extends Request {
  user?: object;
}

export async function authMiddleware(
  req: ReqWithUser,
  res: Response,
  next: NextFunction,
) {
  const { access_token } = req.headers;

  if (!access_token) {
    throw new UnauthorizedException();
  }

  const payload = jwt.verify(
    access_token.toString(),
    process.env.JWT_SECRET_KEY,
  );

  const user = await getRepository(UserEntity).findOne(
    JSON.parse(JSON.stringify(payload)).uuid,
  );

  const userData = classToPlain(user);

  req.user = userData;

  next();
}
