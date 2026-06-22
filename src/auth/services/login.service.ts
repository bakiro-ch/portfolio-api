import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "../dtos/login.dto";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    private readonly prisma: PrismaService, 
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: LoginDto) {
    this.logger.log(`Trying to login with email: ${loginDto.email}`);

    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }
    });

    if (!user) {
      this.logger.warn(`User with email: ${loginDto.email} does not exist, but tried to login`);
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await argon2.verify(user.password, loginDto.password);

    if (!isPasswordValid) {
      this.logger.warn(`User with email: ${loginDto.email} tried to login with wrong password`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    this.logger.log(`User with email: ${loginDto.email} successfully logged in`);

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
}