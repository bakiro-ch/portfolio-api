"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        console.log('--- Cloudinary Env Check ---');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('API Key:', process.env.CLOUDINARY_API_KEY);
        console.log('API Secret:', process.env.CLOUDINARY_API_SECRET);
        console.log('------------------------------');
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map