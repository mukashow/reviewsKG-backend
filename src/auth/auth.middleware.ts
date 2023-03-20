import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { FirebaseApp } from './firebase.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor(
    private firebaseApp: FirebaseApp,
    private usersService: UsersService
  ) {
    this.auth = firebaseApp.getAuth();
  }

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;

    try {
      let userId;
      const decodedToken = await this.auth.verifyIdToken(
        token.replace('Bearer ', '')
      );
      if (req.url.includes('/users/services')) {
        const user = await this.usersService.getUserByPhone(
          decodedToken.phone_number
        );
        userId = user.id;
      }
      req['user'] = { phone: decodedToken.phone_number, id: userId };
      next();
    } catch (e) {
      PreAuthMiddleware.accessDenied(req.url, res);
    }
  }

  private static accessDenied(url: string, res: Response) {
    res.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'not authorized',
    });
  }
}
