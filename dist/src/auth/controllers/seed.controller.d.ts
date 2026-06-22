import { SeedService } from "../services/seed.service";
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    seed(): Promise<{
        success: boolean;
        message: string;
        credentials: {
            email: string;
            password: string;
        };
    }>;
}
