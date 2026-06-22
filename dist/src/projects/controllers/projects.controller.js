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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("../services/projects.service");
const get_projects_query_dto_1 = require("../dtos/get-projects-query.dto");
const swagger_1 = require("@nestjs/swagger");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    getAllProjects(query) {
        return this.projectsService.getAllProjects(query);
    }
    getProject(slug) {
        return this.projectsService.getProjectBySlug(slug);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ example: { success: true, data: [{}, {}], meta: { page: 1, limit: 10, total: 80, totalPages: 9 } } }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_projects_query_dto_1.GetProjectsQueryDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiParam)({ name: 'slug', description: 'The unique slug of the project', example: 'my-project-title-uuid', type: String }),
    (0, swagger_1.ApiOkResponse)({ description: 'Project found successfully' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Project not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects (Public)'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map