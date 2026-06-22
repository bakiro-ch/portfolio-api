import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { PrismaService } from '../database/prisma.service';
import { AdminProjectsService } from './services/admin-projects.service';
import { AdminProjectsController } from './controllers/admin-projects.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [
    ProjectsService,
    AdminProjectsService
  ],
  controllers: [
    ProjectsController,
    AdminProjectsController
  ],
})
export class ProjectsModule {}
