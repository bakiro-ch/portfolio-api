// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { v2 as cloudinary } from 'cloudinary';

// // ✅ 1. تعريف شكل الملف الذي نحتاجه فقط (نتجنب مشكلة Express.Multer.File)
// export interface UploadedFile {
//   buffer: Buffer;
//   originalname?: string;
//   mimetype?: string;
// }

// @Injectable()
// export class CloudinaryService {
//   constructor(private configService: ConfigService) {
//     cloudinary.config({
//       cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
//       api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
//       api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
//     });
//   }

//   // ✅ 2. استخدام الواجهة المخصصة بدلاً من Express.Multer.File
//   async uploadImage(file: UploadedFile): Promise<string> {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: this.configService.get<string>('CLOUDINARY_UPLOAD_FOLDER') || 'portfolio' },
//         (error, result) => {
//           if (error) return reject(new InternalServerErrorException('Error of uploading Image'));
//           resolve(result!.secure_url);
//         }
//       ).end(file.buffer);
//     });
//   }
// }