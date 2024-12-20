// auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from  '../entities/roles.entity';
import { TokenBlacklist } from '../entities/token-blacklist.entity';




@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
    @InjectModel(TokenBlacklist)
    private tokenBlacklistModel: typeof TokenBlacklist,
  ) {}

  async logout(token: string) {
    // Decode token to get expiration
    const decoded = this.jwtService.decode(token);
    const expiresAt = new Date(decoded['exp'] * 1000);

    // Add token to blacklist
    await this.tokenBlacklistModel.create({
      token,
      expiresAt,
    });

    return { message: 'Successfully logged out' };
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.tokenBlacklistModel.findOne({
      where: { token }
    });
    return !!blacklistedToken;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ 
        where: { email },
        include: [{
            model: Role,
            attributes: ['RoleId', 'RoleName']
        }]
    });

    console.log('User with role:', JSON.stringify(user, null, 2)); // Add this debug line

    if (!user) {
        throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
    }

    const { password: _, ...result } = user.toJSON();
    console.log('Result after password removal:', JSON.stringify(result, null, 2)); // Add this debug line
    return result;
}
async generateToken(user: any): Promise<string> {
    const payload = {
        email: user.email,
        sub: user.id,
        role: user.role  // Since we're now passing the role name directly
    };
    return this.jwtService.sign(payload);
}

async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    const payload = {
        email: user.email,
        sub: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.RoleName,  // Include role name
        RoleId: user.RoleId       // Add this line - include RoleId
    };
    
    return {
      
        user,
        access_token: await this.jwtService.sign(payload), // Sign directly instead of calling generateToken
    };
}
  // auth/auth.service.ts
  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user - let the @BeforeCreate hook handle the password hashing
    console.log('Register DTO:', registerDto);
    const user = await this.userModel.create({ ...registerDto, RoleId: 3 });

    // Generate token
    const payload = {
      email: user.email,
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      RoleId: 3,
    };

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toJSON();

    return {
      user: userWithoutPassword,
      access_token: await this.generateToken(payload),
    };
  }
  getRoles() {
    return this.roleModel.findAll();
  }
}
