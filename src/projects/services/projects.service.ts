import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}

    public async getAllProjects(query: { page?: number, limit?: number, sortBy?: string, order?: string, search?: string, technologies?: string}) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'createdAt';
        const order = query.order || 'desc';

        let where: any = { status: 'published' };

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

    public async getProjectBySlug(slug : string){
        const project = await this.prisma.project.findUnique({
            where:{
                slug,
                status: "published"
            },
        });

        if(!project)
            throw new NotFoundException(`Project with slug '${slug}' not found`);

        return{
            success: true,
            data:project
        };
    }
}