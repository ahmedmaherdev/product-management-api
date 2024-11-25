import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from 'src/users/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token.service';
import * as bcrypt from 'bcryptjs';
import { UserRole } from './enums/user-role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly tokenService: TokenService,
        private readonly userService: UsersService
    ) { }
    async register(registerDto: RegisterDto): Promise<{ user: User }> {
        const existingUser = await this.userService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Please, use another email');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
        const savedUser = await this.userModel.create({
            email: registerDto.email,
            password: hashedPassword,
            role: registerDto.role || UserRole.USER
        });

        this.removeSensitiveFields(savedUser);
        
        return { user: savedUser };
    }

    async login(loginDto: LoginDto) { 
        const user = await this.userModel.findOne({ email: loginDto.email }).select('+password');
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        
        if (!await bcrypt.compare(loginDto.password, user.password)) {
            throw new UnauthorizedException('Invalid email or password');
        }
        
        this.removeSensitiveFields(user);

        return { token: this.generateUserToken(user), user };
    }

    private generateUserToken(user: User): string {
        const payload = { sub: user._id, email: user.email, role: user.role };
        return this.tokenService.generateToken(payload);
    }

    private removeSensitiveFields(user: User) {
        user.password = undefined;
    }
}
