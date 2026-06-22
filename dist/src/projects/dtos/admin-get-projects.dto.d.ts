import { GetProjectsQueryDto } from "./get-projects-query.dto";
import { ProjectStatus } from "../../generated/prisma/enums";
export declare class AdminGetProjectsDto extends GetProjectsQueryDto {
    status?: ProjectStatus;
}
