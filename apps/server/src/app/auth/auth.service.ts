import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    // Check if user exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      userId: user._id,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate user
    const user = await this.validateUser(email, password);

    // Generate JWT token
    const payload: AuthPayload = {
      sub: user._id.toString(),
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '8h', // 8-hour session
    });

    // Remove sensitive information
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async refreshToken(user: User) {
    const payload: AuthPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '8h',
      }),
    };
  }
}
