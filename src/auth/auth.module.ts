import { Module, Logger } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller";
import { LoginService } from "./services/login.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get<string>("JWT_SECRET_KEY");
                const expiresIn = config.get<string>("JWT_EXPIRES_IN") || '7d';
                                
                if (!secret) {
                    Logger.error('❌ JWT_SECRET is undefined!');
                }
                
                return {
                    global: true,
                    secret: secret,
                    signOptions: { 
                        expiresIn: expiresIn  as any
                    }
                };
            }
        })
    ],
    controllers: [LoginController],
    providers: [LoginService, PrismaService, JwtStrategy]
})
export class AuthModule {}