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
exports.AdminGetProjectsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const get_projects_query_dto_1 = require("./get-projects-query.dto");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../generated/prisma/enums");
class AdminGetProjectsDto extends get_projects_query_dto_1.GetProjectsQueryDto {
    status;
}
exports.AdminGetProjectsDto = AdminGetProjectsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['draft', 'published'], description: 'Filter by status (Admin only)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ProjectStatus),
    __metadata("design:type", String)
], AdminGetProjectsDto.prototype, "status", void 0);
//# sourceMappingURL=admin-get-projects.dto.js.map