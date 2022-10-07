import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { UserModule } from '@api/app/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtGuard } from '@api/app/guard/jwt.guard';
import { JwtStrategy } from '@api/app/strategy/jwt.strategy';
import { BcryptService } from '@api/app/shared/bcrypt.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '30 days'
        }
      })
    })
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtGuard,
    JwtStrategy,
    BcryptService
  ],
})
export class AuthModule { }
