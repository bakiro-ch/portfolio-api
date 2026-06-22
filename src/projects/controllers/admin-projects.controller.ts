import { UseGuards, Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Patch, Delete, HttpCode, UseInterceptors, UploadedFile, Put, } from "@nestjs/common";
import { CreateProjectDto } from "../dtos/create-project.dto";
import { AdminProjectsService } from "../services/admin-projects.service";
import { AdminGetProjectsDto } from "../dtos/admin-get-projects.dto";
import { ApiOperation, ApiConsumes, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import { User } from "../../auth/decorators/user.decorator";
import type { UserPayload } from "../../interfaces/user-payload.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageFileValidationPipe } from "../../common/pipes/image-file-validation.pipe";
import 'multer'; 

@ApiTags('Projects (Admin)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('ADMIN')
// @UseGuards(AuthGuard('jwt'))
@Controller('admin/projects')
export class AdminProjectsController{

    constructor(private readonly adminProjectsService: AdminProjectsService){}
    
    // Create New Project
    @Post()
    @ApiOperation({ summary: "Create new project with image (for admin only)" })
    public createProject(
        @Body() body: CreateProjectDto
    ){
        return this.adminProjectsService.createProject(body)
    }

    // Get All projects
    @Get()
    @ApiOkResponse({ example:{ success: true, data: [{},{}], meta: {page: 1,limit: 10, total:80, totalPages: 9}} })
    public adminGetAllProjects(@Query() query: AdminGetProjectsDto){
        return this.adminProjectsService.getAllProjects(query, query.status)
    }

    // Get Project
    @Get(':id')
    @ApiOkResponse({ description: 'Project found successfully' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    public adminGetProject(@Param('id', ParseUUIDPipe) id: string){
        return this.adminProjectsService.getProjectById(id);
    }

    // Update Project
    @Patch(':id')
    @ApiOperation({ summary: 'Update a project' })
    public adminUpdateProject(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateProjectDto, @User() user: UserPayload){
        return this.adminProjectsService.updateProject(id, body, user)
    }

    // Delete Project
    @ApiOperation({ summary: 'Delete a project' })
    @HttpCode(204)
    @Delete(':id')
    public deleteProject(@Param('id', ParseUUIDPipe) id: string, @User() user: UserPayload){
        return this.adminProjectsService.deleteProject(id, user)
    }

    // Upload Project Image
    @Post(':id/image')
    @ApiOperation({ summary: 'Upload project image' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
            image: {
                type: 'string',
                format: 'binary',
                description: 'Image file (jpg, jpeg, png, webp) - Max 5MB',
            },
            },
        },
    })
    @ApiOkResponse({
        schema: {
        example: {
            success: true,
            data: {
                imageUrl: 'https://cdn.example.com/projects/image.png'
            }
        }
        }
    })
    @UseInterceptors(FileInterceptor('image'))
    public uploadProjectImage(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(ImageFileValidationPipe) image: Express.Multer.File, @User() user: UserPayload){
        return this.adminProjectsService.uploadProjectImage(id, image, user);
    }

    // Update Peoject Image
    @Put(':id/image')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
            image: {
                type: 'string',
                format: 'binary',
                description: 'Image file (jpg, jpeg, png, webp) - Max 5MB',
            },
            },
        },
    })
    @ApiOperation({ summary: 'Update project image' })
    @ApiOkResponse({
        schema: {
            example:{
                success: true,
                data: {
                    imageUrl: 'https://cdn.example.com/projects/updated-image.png'
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('image'))
    public updateProjectImage(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(ImageFileValidationPipe) image: Express.Multer.File, @User() user: UserPayload){
        return this.adminProjectsService.updateProjectImage(id, image, user);
    }

    // Delete Project Image
    @Delete(':id/image')
    @ApiOperation({ summary: 'Delete project image' })
    @HttpCode(204)
    public deleteProjectImage(@Param('id', ParseUUIDPipe) id: string, @User() user: UserPayload){
        return this.adminProjectsService.deleteProjectImage(id, user);
    }
}