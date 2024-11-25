import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './token.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, TokenService, ConfigService, JwtStrategy],
  controllers: [AuthController],
  imports: [UsersModule, PassportModule],
})
export class AuthModule {}
