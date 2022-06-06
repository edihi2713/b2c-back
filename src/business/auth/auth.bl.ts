import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider } from 'src/providers/auth/auth.provider';
import { JWTPayload } from 'src/schemas/auth/JWTPayload';
import { Users } from 'src/schemas/user/user.schema';
@Injectable()
export class AuthBusiness {
  constructor(
    private readonly provider: AuthProvider,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = (await this.provider.getUserByEmail(
      username,
    )) as unknown as Users;
    if (user) return user.comparePassword(pass);
    else return false;
  }

  async generateAccessToken(name: string) {
    const user = (await this.provider.getUserByEmail(name)) as unknown as Users;
    const payload: JWTPayload = { userId: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
