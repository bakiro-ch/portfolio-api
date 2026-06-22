import { CreateProjectDto } from "../dtos/create-project.dto";
import { AdminProjectsService } from "../services/admin-projects.service";
import { AdminGetProjectsDto } from "../dtos/admin-get-projects.dto";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import type { UserPayload } from "../../interfaces/user-payload.interface";
import 'multer';
export declare class AdminProjectsController {
    private readonly adminProjectsService;
    constructor(adminProjectsService: AdminProjectsService);
    createProject(body: CreateProjectDto): Promise<{
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
    adminGetAllProjects(query: AdminGetProjectsDto): Promise<{
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
    adminGetProject(id: string): Promise<{
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
    adminUpdateProject(id: string, body: UpdateProjectDto, user: UserPayload): Promise<{
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
    deleteProject(id: string, user: UserPayload): Promise<void>;
    uploadProjectImage(id: string, image: Express.Multer.File, user: UserPayload): Promise<{
        success: boolean;
        imageUrl: string | null;
    }>;
    updateProjectImage(id: string, image: Express.Multer.File, user: UserPayload): Promise<{
        success: boolean;
        data: string | null;
    }>;
    deleteProjectImage(id: string, user: UserPayload): Promise<void>;
}
