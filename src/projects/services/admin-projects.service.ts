import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "../dtos/create-project.dto";
import { PrismaService } from "../../database/prisma.service";
import { generateSlug } from "../../common/utils/generate-slug.util";
import { randomUUID } from "crypto";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import { Request } from "express";
import { Prisma } from "../../generated/prisma/client";
import { UserPayload } from "../../interfaces/user-payload.interface";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";

@Injectable()
export class AdminProjectsService{

    constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService){
        
    };
    
    private readonly logger = new Logger(AdminProjectsService.name);
    
    // Create Project
    public async createProject(body: CreateProjectDto) {
        try{
            const project = await this.prisma.$transaction(async (tx) => {

                const created = await tx.project.create({
                    data: {
                        ...body,
                        slug: `temp-${randomUUID()}`,
                    },
                });

                const slug = `${generateSlug(body.title)}-${created.id}`;

                return tx.project.update({
                    where: { id: created.id },
                    data: { slug },
                });
            });

            return {
                success: true,
                data: project,
            };

        }catch(error: any){
            if(error.code === "P2002")
                throw new ConflictException('Slug already exists');
            if(error.code === "P2003")
                throw new BadRequestException('Validation error')
            throw error
        }
    }

    // Get All Projects
    public async getAllProjects(query: { page?: number, limit?: number, sortBy?: string, order?: string, search?: string, technologies?: string}, statusFilter?: string) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'createdAt';
        const order = query.order || 'desc';

        let where: any = {};

        if (statusFilter){
            where.status = statusFilter
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

    // Get One Project
    public async getProjectById(id : string){
        const project = await this.prisma.project.findUnique({
            where: {
                id
            }
        })

        if(!project)
            throw new NotFoundException(`Project with ID ${id} not found`);

        return {
            success: true,
            data: project
        }
    };

    // Update Project
    public async updateProject(id: string, body: UpdateProjectDto, user: UserPayload) {
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
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`Project with ID ${id} not found`);
            }
            if (error.code === 'P2002') {
                throw new ConflictException('Slug or unique field already exists');
            }
            throw error;
        }
    }

    // Delete Project
    public async deleteProject(id: string, user: UserPayload){
        try{
            await this.prisma.project.delete({
                where: { id }
            })

            this.logger.log(`Admin with email: ${user.email} deleted project: ${id}`)

        }
        catch(error: any){
            if (error.code === 'P2025') {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
            this.logger.error(`Failed to delete project ${id}: ${error.message}`);
            throw error;
        }
    }

    // Upload Project Image
    public async uploadProjectImage(id: string, file: Express.Multer.File, user: UserPayload){
        
        try{
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            })

            if(!project){
                throw new NotFoundException(`Project with ID ${id} not found`);
            }

            if(project.imageUrl){
                throw new ConflictException('Project already has an image. Use PUT to update.');
            }

            const image = await this.cloudinary.uploadImage(file)

            const updated = await this.prisma.project.update({
                where: {
                    id,
                },
                data: {
                    imageUrl: image.secure_url,
                    imagePublicId: image.public_id
                }
            })

            this.logger.log(`Admin ${user.email} uploaded image for project ${id}`);

            return {
                success: true,
                imageUrl: updated.imageUrl
            }

        }catch(error: any){
            this.logger.error(`Failed to upload image for project ${id}: ${error.message}`)
            throw error 
        }
    }

    // Update Project Image
    public async updateProjectImage(id: string, file: Express.Multer.File, user: UserPayload){
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            })

            if(!project){
                throw new NotFoundException(`Project with ID ${id} not found`);
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
            })

            this.logger.log(`Admin ${user.email} updated image for project ${id}`);

            return {
                success: true,
                data: updated.imageUrl
            }
        }catch (error: any){
            this.logger.error(`Failed to update image for project ${id}: ${error.message}`);
            throw error;
        }
    }

    // Delete Project Image
    public async deleteProjectImage(id: string, user: UserPayload){
        try{
            const project = await this.prisma.project.findUnique({
                where: {
                    id
                }
            })

            if(!project){
                throw new NotFoundException(`Project with ID ${id} not found`);
            }

            if(project.imagePublicId){
                await this.cloudinary.deleteImage(project.imagePublicId);
            }

            const updated = await this.prisma.project.update({
                where:{
                    id
                },
                data: {
                    imageUrl: null,
                    imagePublicId: null
                }
            })

            this.logger.log(`Admin ${user.email} deleted image for project ${id}`);
        }catch (error: any){
            this.logger.error(`Failed to delete image for project ${id}: ${error.message}`);
            throw error
        }
    }
}