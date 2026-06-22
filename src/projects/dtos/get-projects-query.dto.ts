import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class GetProjectsQueryDto{
    @ApiPropertyOptional({ default: 1, minimum: 1 })
    @IsInt() @IsOptional() @Min(1) @Type(() => Number)
    page? : number;

    @ApiPropertyOptional({ default: 10, minimum: 2, maximum: 50 })
    @IsInt() @IsOptional() @Min(2) @Max(50) @Type(() => Number)
    limit? : number;

    @ApiPropertyOptional({ enum: ['createdAt', 'updatedAt', 'title'], })
    @IsIn(['createdAt', 'updatedAt', 'title']) @IsOptional()
    sortBy? : 'createdAt' | 'updatedAt' | 'title';

    @ApiPropertyOptional({ enum: ['asc', 'desc'] })
    @IsIn(['asc', 'desc']) @IsOptional()
    order? : 'asc' | 'desc';

    @ApiPropertyOptional({ maxLength: 255 })
    @IsString() @IsOptional() @MaxLength(255)
    search? : string
    
    @ApiPropertyOptional( { example: 'NestJS,PostgreSQL',})
    @IsString() @IsOptional() @MaxLength(500) 
    technologies? : string
}