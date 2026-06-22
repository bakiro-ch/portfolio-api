"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const login_controller_1 = require("./controllers/login.controller");
const login_service_1 = require("./services/login.service");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../database/prisma.service");
const seed_service_1 = require("./services/seed.service");
const seed_controller_1 = require("./controllers/seed.controller");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const secret = config.get("JWT_SECRET_KEY");
                    const expiresIn = config.get("JWT_EXPIRES_IN") || '7d';
                    if (!secret) {
                        common_1.Logger.error('❌ JWT_SECRET is undefined!');
                    }
                    return {
                        global: true,
                        secret: secret,
                        signOptions: {
                            expiresIn: expiresIn
                        }
                    };
                }
            })
        ],
        controllers: [login_controller_1.LoginController, seed_controller_1.SeedController],
        providers: [login_service_1.LoginService, prisma_service_1.PrismaService, seed_service_1.SeedService, jwt_strategy_1.JwtStrategy]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map