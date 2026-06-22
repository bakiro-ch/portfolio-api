import { ProjectsService } from '../services/projects.service';
import { GetProjectsQueryDto } from '../dtos/get-projects-query.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    getAllProjects(query: GetProjectsQueryDto): Promise<{
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
    getProject(slug: string): Promise<{
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
