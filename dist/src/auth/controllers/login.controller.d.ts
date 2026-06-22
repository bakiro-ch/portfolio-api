import { LoginDto } from "../dtos/login.dto";
import { LoginService } from "../services/login.service";
export declare class LoginController {
    readonly loginService: LoginService;
    constructor(loginService: LoginService);
    adminLogin(user: LoginDto): Promise<{
        success: boolean;
        token: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
        };
    }>;
}
