import { Body, Controller, Post } from '@nestjs/common';
import { API_URIS } from 'src/common/constants/api-uris';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/user.schema';
import { LoginDto } from './dto/login.dto';

@Controller(API_URIS.AUTH.BASE)
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post(API_URIS.AUTH.REGISTER)
    async register(@Body() registerDto: RegisterDto): Promise<{ user: User, token: string }> {
        return this.authService.register(registerDto);
    }

    @Post(API_URIS.AUTH.LOGIN)
    async login(@Body() loginDto: LoginDto): Promise<{ user: User, token: string }> {
        return this.authService.login(loginDto);
    }
}
