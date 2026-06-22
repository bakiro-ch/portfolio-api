"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllProjects(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'createdAt';
        const order = query.order || 'desc';
        let where = { status: 'published' };
        if (query.technologies) {
            where.technologies = { hasSome: query.technologies.split(',') };
        }
        if (query.search) {
            where.title = { contains: query.search, mode: 'insensitive' };
        }
        const data = await this.prisma.project.findMany({
            where,
            orderBy: { [sortBy]: order },
            take: limit,
            skip,
        });
        const total = await this.prisma.project.count({ where });
        return {
            success: true,
            data: data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getProjectBySlug(slug) {
        const project = await this.prisma.project.findUnique({
            where: {
                slug,
                status: "published"
            },
        });
        if (!project)
            throw new common_1.NotFoundException(`Project with slug '${slug}' not found`);
        return {
            success: true,
            data: project
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map