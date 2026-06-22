import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageFileValidationPipe implements PipeTransform {

    private readonly MAX_SIZE = 5 * 1024 * 1024; // 5MB
    private readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    transform(file: Express.Multer.File): Express.Multer.File {
        
        if (!file) {
            throw new BadRequestException('File is required');
        }

        if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
            throw new BadRequestException(
                `Invalid file type. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`
            );
        }

        if (file.size > this.MAX_SIZE) {
            throw new BadRequestException(
                `File size too large. Maximum size: ${this.MAX_SIZE / (1024 * 1024)}MB`
            );
        }
        return file;
    }
}