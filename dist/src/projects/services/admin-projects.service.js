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
var AdminProjectsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const generate_slug_util_1 = require("../../common/utils/generate-slug.util");
const crypto_1 = require("crypto");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
let AdminProjectsService = AdminProjectsService_1 = class AdminProjectsService {
    prisma;
    cloudinary;
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    ;
    logger = new common_1.Logger(AdminProjectsService_1.name);
    async createProject(body) {
        try {
            const project = await this.prisma.$transaction(async (tx) => {
                const created = await tx.project.create({
                    data: {
                        ...body,
                        slug: `temp-${(0, crypto_1.randomUUID)()}`,
                    },
                });
                const slug = `${(0, generate_slug_util_1.generateSlug)(body.title)}-${created.id}`;
                return tx.project.update({
                    where: { id: created.id },
                    data: { slug },
                });
            });
            return {
                success: true,
                data: project,
            };
        }
        catch (error) {
            if (error.code === "P2002")
                throw new common_1.ConflictException('Slug already exists');
            if (error.code === "P2003")
                throw new common_1.BadRequestException('Validation error');
            throw error;
        }
    }
    async getAllProjects(query, statusFilter) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'createdAt';
        const order = query.order || 'desc';
        let where = {};
        if (statusFilter) {
            where.status = statusFilter;
        }
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
    async getProjectById(id) {
        const project = await this.prisma.project.findUnique({
            where: {
                id
            }
        });
        if (!project)
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        return {
            success: true,
            data: project
        };
    }
    ;
    async updateProject(id, body, user) {
        try {
            const project = await this.prisma.project.update({
                where: { id },
                data: { ...body }
            });
            this.logger.log(`Admin with email: ${user.email} updated project: ${id}`);
            return {
                success: true,
                data: project
            };
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Slug or unique field already exists');
            }
            throw error;
        }
    }
    async deleteProject(id, user) {
        try {
            await this.prisma.project.delete({
                where: { id }
            });
            this.logger.log(`Admin with email: ${user.email} deleted project: ${id}`);
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            this.logger.error(`Failed to delete project ${id}: ${error.message}`);
            throw error;
        }
    }
    async uploadProjectImage(id, file, user) {
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            if (project.imageUrl) {
                throw new common_1.ConflictException('Project already has an image. Use PUT to update.');
            }
            const image = await this.cloudinary.uploadImage(file);
            const updated = await this.prisma.project.update({
                where: {
                    id,
                },
                data: {
                    imageUrl: image.secure_url,
                    imagePublicId: image.public_id
                }
            });
            this.logger.log(`Admin ${user.email} uploaded image for project ${id}`);
            return {
                success: true,
                imageUrl: updated.imageUrl
            };
        }
        catch (error) {
            this.logger.error(`Failed to upload image for project ${id}: ${error.message}`);
            throw error;
        }
    }
    async updateProjectImage(id, file, user) {
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            if (project.imagePublicId) {
                await this.cloudinary.deleteImage(project.imagePublicId);
            }
            const image = await this.cloudinary.uploadImage(file);
            const updated = await this.prisma.project.update({
                where: {
                    id
                },
                data: {
                    imageUrl: image.secure_url,
                    imagePublicId: image.public_id
                }
            });
            this.logger.log(`Admin ${user.email} updated image for project ${id}`);
            return {
                success: true,
                data: updated.imageUrl
            };
        }
        catch (error) {
            this.logger.error(`Failed to update image for project ${id}: ${error.message}`);
            throw error;
        }
    }
    async deleteProjectImage(id, user) {
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            if (project.imagePublicId) {
                await this.cloudinary.deleteImage(project.imagePublicId);
            }
            const updated = await this.prisma.project.update({
                where: {
                    id
                },
                data: {
                    imageUrl: null,
                    imagePublicId: null
                }
            });
            this.logger.log(`Admin ${user.email} deleted image for project ${id}`);
        }
        catch (error) {
            this.logger.error(`Failed to delete image for project ${id}: ${error.message}`);
            throw error;
        }
    }
};
exports.AdminProjectsService = AdminProjectsService;
exports.AdminProjectsService = AdminProjectsService = AdminProjectsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, cloudinary_service_1.CloudinaryService])
], AdminProjectsService);
//# sourceMappingURL=admin-projects.service.js.map