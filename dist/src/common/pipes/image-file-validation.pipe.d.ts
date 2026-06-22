import { PipeTransform } from '@nestjs/common';
export declare class ImageFileValidationPipe implements PipeTransform {
    private readonly MAX_SIZE;
    private readonly ALLOWED_TYPES;
    transform(file: Express.Multer.File): Express.Multer.File;
}
