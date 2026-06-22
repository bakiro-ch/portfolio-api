import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "../dtos/login.dto";
import { PrismaService } from "../../database/prisma.service";
export declare class LoginService {
    private readonly prisma;
    private readonly jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        token: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
    }>;
}
