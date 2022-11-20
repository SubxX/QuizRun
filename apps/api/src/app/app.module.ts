import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { DepartmentModule } from './modules/department/department.module';
import { QuizModule } from './modules/quiz/quiz.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/api/.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    OrganizationModule,
    DepartmentModule,
    QuizModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
