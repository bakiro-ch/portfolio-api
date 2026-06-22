import { PrismaService } from '../../database/prisma.service';
export declare class SeedService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createAdmin(): Promise<{
        success: boolean;
        message: string;
        credentials: {
            email: string;
            password: string;
        };
    }>;
}
