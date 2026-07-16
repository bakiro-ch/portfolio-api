"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../src/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const argon2 = __importStar(require("argon2"));
async function updatePass() {
    const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
    const prisma = new client_1.PrismaClient({ adapter });
    const email = process.env.ADMIN_EMAIL;
    const newPass = process.env.NEW_ADMIN_PASSWORD;
    if (!email || !newPass) {
        console.error('❌ Cannot find admin credentials in environment variables.');
        process.exit(1);
    }
    const user = await prisma.user.findUnique({ where: { email, role: 'ADMIN' } });
    if (!user) {
        console.error('❌ We can not find this admin account.');
        process.exit(1);
    }
    await prisma.user.update({
        where: { id: user.id },
        data: { password: await argon2.hash(newPass) },
    });
    console.log('✅ The admin password has successfully updated.');
    await prisma.$disconnect();
}
updatePass().catch(console.error);
//# sourceMappingURL=update-admin-pass.js.map