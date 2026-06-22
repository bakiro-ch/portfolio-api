import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    uploadImage(file: any): Promise<CloudinaryResponse>;
    deleteImage(publicId: string): Promise<void>;
}
