export declare class CreateProjectDto {
    title: string;
    description?: string;
    status: 'draft' | 'published';
    isFeatured?: boolean;
    demoLink: string;
    githubLink?: string;
    technologies?: string[];
    setupGuide?: string;
}
