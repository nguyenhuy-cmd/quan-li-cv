import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'YOUR_SECRET_KEY', // Phải trùng với key ở JwtModule
    });
  }

  async validate(payload: any) {
    // Giá trị trả về ở đây sẽ được gán tự động vào `req.user`
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}