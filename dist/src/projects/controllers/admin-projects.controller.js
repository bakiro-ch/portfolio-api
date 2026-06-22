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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProjectsController = void 0;
const common_1 = require("@nestjs/common");
const create_project_dto_1 = require("../dtos/create-project.dto");
const admin_projects_service_1 = require("../services/admin-projects.service");
const admin_get_projects_dto_1 = require("../dtos/admin-get-projects.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const update_project_dto_1 = require("../dtos/update-project.dto");
const user_decorator_1 = require("../../auth/decorators/user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const image_file_validation_pipe_1 = require("../../common/pipes/image-file-validation.pipe");
require("multer");
let AdminProjectsController = class AdminProjectsController {
    adminProjectsService;
    constructor(adminProjectsService) {
        this.adminProjectsService = adminProjectsService;
    }
    createProject(body) {
        return this.adminProjectsService.createProject(body);
    }
    adminGetAllProjects(query) {
        return this.adminProjectsService.getAllProjects(query, query.status);
    }
    adminGetProject(id) {
        return this.adminProjectsService.getProjectById(id);
    }
    adminUpdateProject(id, body, user) {
        return this.adminProjectsService.updateProject(id, body, user);
    }
    deleteProject(id, user) {
        return this.adminProjectsService.deleteProject(id, user);
    }
    uploadProjectImage(id, image, user) {
        return this.adminProjectsService.uploadProjectImage(id, image, user);
    }
    updateProjectImage(id, image, user) {
        return this.adminProjectsService.updateProjectImage(id, image, user);
    }
    deleteProjectImage(id, user) {
        return this.adminProjectsService.deleteProjectImage(id, user);
    }
};
exports.AdminProjectsController = AdminProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create new project with image (for admin only)" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ example: { success: true, data: [{}, {}], meta: { page: 1, limit: 10, total: 80, totalPages: 9 } } }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_get_projects_dto_1.AdminGetProjectsDto]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "adminGetAllProjects", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Project found successfully' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Project not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "adminGetProject", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a project' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto, Object]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "adminUpdateProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a project' }),
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.Post)(':id/image'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload project image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            example: {
                success: true,
                data: {
                    imageUrl: 'https://cdn.example.com/projects/image.png'
                }
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)(image_file_validation_pipe_1.ImageFileValidationPipe)),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "uploadProjectImage", null);
__decorate([
    (0, common_1.Put)(':id/image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Update project image' }),
    (0, swagger_1.ApiOkResponse)({
        schema: {
            example: {
                success: true,
                data: {
                    imageUrl: 'https://cdn.example.com/projects/updated-image.png'
                }
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)(image_file_validation_pipe_1.ImageFileValidationPipe)),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "updateProjectImage", null);
__decorate([
    (0, common_1.Delete)(':id/image'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete project image' }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminProjectsController.prototype, "deleteProjectImage", null);
exports.AdminProjectsController = AdminProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects (Admin)'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Controller)('admin/projects'),
    __metadata("design:paramtypes", [admin_projects_service_1.AdminProjectsService])
], AdminProjectsController);
//# sourceMappingURL=admin-projects.controller.js.map