import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ProjectsModule,AuthModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env.development'
  }), CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
