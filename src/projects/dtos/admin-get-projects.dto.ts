import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetProjectsQueryDto } from "./get-projects-query.dto";
import { IsEnum, IsOptional } from "class-validator";
import { ProjectStatus } from "../../generated/prisma/enums";

export class AdminGetProjectsDto extends GetProjectsQueryDto{
    @ApiPropertyOptional({ enum: ['draft' , 'published'], description: 'Filter by status (Admin only)' })
    @IsOptional() @IsEnum(ProjectStatus)
    status?: ProjectStatus
    
}