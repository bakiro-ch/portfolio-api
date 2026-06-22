import { PrismaService } from '../../database/prisma.service';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllProjects(query: {
        page?: number;
        limit?: number;
        sortBy?: string;
        order?: string;
        search?: string;
        technologies?: string;
    }): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            status: import("../../generated/prisma/enums").ProjectStatus;
            isFeatured: boolean;
            imageUrl: string | null;
            imagePublicId: string | null;
            demoLink: string;
            githubLink: string | null;
            technologies: string[];
            setupGuide: string | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getProjectBySlug(slug: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            status: import("../../generated/prisma/enums").ProjectStatus;
            isFeatured: boolean;
            imageUrl: string | null;
            imagePublicId: string | null;
            demoLink: string;
            githubLink: string | null;
            technologies: string[];
            setupGuide: string | null;
        };
    }>;
}
