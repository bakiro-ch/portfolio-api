import { CreateProjectDto } from "../dtos/create-project.dto";
import { PrismaService } from "../../database/prisma.service";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import { UserPayload } from "../../interfaces/user-payload.interface";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";
export declare class AdminProjectsService {
    private readonly prisma;
    private readonly cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    private readonly logger;
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
    getAllProjects(query: {
        page?: number;
        limit?: number;
        sortBy?: string;
        order?: string;
        search?: string;
        technologies?: string;
    }, statusFilter?: string): Promise<{
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
    getProjectById(id: string): Promise<{
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
    updateProject(id: string, body: UpdateProjectDto, user: UserPayload): Promise<{
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
    uploadProjectImage(id: string, file: Express.Multer.File, user: UserPayload): Promise<{
        success: boolean;
        imageUrl: string | null;
    }>;
    updateProjectImage(id: string, file: Express.Multer.File, user: UserPayload): Promise<{
        success: boolean;
        data: string | null;
    }>;
    deleteProjectImage(id: string, user: UserPayload): Promise<void>;
}
