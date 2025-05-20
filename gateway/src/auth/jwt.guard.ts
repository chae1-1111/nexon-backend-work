import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (user) {
      request.user = user;

      request.userHeaders = {
        'x-user-id': user.sub ?? user.userId,
        'x-user-role': user.role,
      };
    }

    return user;
  }
}
