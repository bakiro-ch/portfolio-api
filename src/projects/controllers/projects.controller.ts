import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { GetProjectsQueryDto } from '../dtos/get-projects-query.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects (Public)')
@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @ApiOkResponse({ example:{ success: true, data: [{},{}], meta: {page: 1,limit: 10, total:80, totalPages: 9}} })
    public getAllProjects(@Query() query: GetProjectsQueryDto) {
        return this.projectsService.getAllProjects(query);
    }

    @Get(':slug')
    @ApiParam({ name: 'slug', description: 'The unique slug of the project', example: 'my-project-title-uuid', type: String })
    @ApiOkResponse({ description: 'Project found successfully' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    public getProject(@Param('slug') slug : string){
        return this.projectsService.getProjectBySlug(slug);
    }

}
