export declare class GetProjectsQueryDto {
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'title';
    order?: 'asc' | 'desc';
    search?: string;
    technologies?: string;
}
