"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let ImageFileValidationPipe = class ImageFileValidationPipe {
    MAX_SIZE = 5 * 1024 * 1024;
    ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    transform(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Invalid file type. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`);
        }
        if (file.size > this.MAX_SIZE) {
            throw new common_1.BadRequestException(`File size too large. Maximum size: ${this.MAX_SIZE / (1024 * 1024)}MB`);
        }
        return file;
    }
};
exports.ImageFileValidationPipe = ImageFileValidationPipe;
exports.ImageFileValidationPipe = ImageFileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ImageFileValidationPipe);
//# sourceMappingURL=image-file-validation.pipe.js.map