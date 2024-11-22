import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Request> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    const decoded: jwt.Jwt = jwt.decode(token, {
      complete: true,
    });
    
    const userId = decoded?.payload?.['userId'];
    const role = decoded.payload?.['role'];
    request.headers.userId = userId;

    request.query.mongoQuery = {
      _id: { $nin: [new mongoose.Types.ObjectId(String(userId))] },
    };

    return next.handle();
  }
}
