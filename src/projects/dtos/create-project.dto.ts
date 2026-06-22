import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUrl, Length, MaxLength, IsOptional, IsArray, IsIn, IsBoolean, ArrayMaxSize } from "class-validator";

export class CreateProjectDto {
    @ApiProperty({ example: 'My Portfolio', minLength: 3, maxLength: 100 })
    @Length(3, 100) @IsString()
    title!: string;

    @ApiProperty( { example: 'Clean project.', required: false, maxLength: 2000})
    @MaxLength(2000) @IsString() @IsOptional()
    description?: string;

    @ApiProperty({ enum: ['draft', 'published'], example: 'draft' })
    @IsString()
    @IsIn(['draft', 'published'])
    status!: 'draft' | 'published';

    @ApiProperty({ example: false, required: false })
    @IsBoolean() @IsOptional() @Type(()=> Boolean)
    isFeatured?: boolean;

    // @ApiPropertyOptional({ 
    //     type: 'string', 
    //     format: 'binary',
    //     description: 'Project image file' 
    // })
    // @IsUrl() @IsOptional()
    // imageUrl?: string;

    @ApiProperty({ example: 'https://example.com/demo' })
    @IsUrl()
    demoLink!: string;

    @ApiProperty({ example: 'https://github.com/user/repo', required: false })
    @IsUrl() @IsOptional()
    githubLink?: string;

    @ApiProperty({ example: ['NestJS','PostgreSQL'], required: false, })
    @IsString({ each:true }) @IsOptional() @MaxLength(500, { each:true }) @IsArray() @ArrayMaxSize(50)
    technologies?: string[];

    @ApiProperty({ example: '# Setup', required: false, maxLength: 10000 })
    @MaxLength(10000) @IsOptional() @IsString()
    setupGuide?: string;

}